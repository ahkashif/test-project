"use server";

import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { nanoid } from "nanoid";

export async function UploadImage(image: File, folderName: string): Promise<string> {
	try {
		console.log(image);
		const client = new S3Client({
			region: process.env.REGION,
			credentials: {
				accessKeyId: process.env.ACCESS_KEY_ID!,
				secretAccessKey: process.env.SECRET_ACCESS_KEY!,
			},
		});

		const uniqueKey = `${folderName}/${nanoid()}-${image.name}`;

		const putObject = new PutObjectCommand({
			Bucket: process.env.BUCKET_NAME!,
			Key: uniqueKey,
		});
		const signedUrl = await getSignedUrl(client, putObject, {
			expiresIn: 60,
		});

		const response = await fetch(signedUrl, {
			method: "PUT",
			body: image,
			headers: {
				"Content-Type": image.type,
			},
		});

		if (!response.ok) {
			console.error("S3 Response Status:", response.status);
			console.error("S3 Response Text:", await response.text());
			throw new Error(`Failed to upload image: ${response.statusText}`);
		}
		const s3Url = `https://${process.env.BUCKET_NAME!}.s3.${process.env.REGION!}.amazonaws.com/${uniqueKey}`;

		return s3Url;
	} catch (error) {
		console.error("Error uploading image:", error);
		throw error;
	}
}
