import { CreateMediaRequest, Media, MediaMutationResponse, MediaResponse } from "../types/media";

const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";




export async function getMedia(): Promise<MediaResponse> {
  const response = await fetch(
    `${API_URL}/api/media`,
    {
      method: "GET",
      cache: "no-store",
    }
  );

  const result = await response.json();

  if (!response.ok) {
    throw new Error(
      result.message || "Failed to fetch media"
    );
  }

  return result;
}


export async function getMediaById(
  id: string
): Promise<Media> {
  const response = await fetch(
    `${API_URL}/api/media/${id}`,
    {
      method: "GET",
      cache: "no-store",
    }
  );

  const result = await response.json();

  if (!response.ok) {
    throw new Error(
      result.message || "Media not found"
    );
  }

  return result;
}


export async function createMedia(
  data: CreateMediaRequest
): Promise<MediaMutationResponse> {
  const response = await fetch(
    `${API_URL}/api/media`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(data),
    }
  );

  const result = await response.json();

  if (!response.ok) {
    throw new Error(
      result.message || "Failed to create media"
    );
  }

  return result;
}


export async function deleteMedia(
  id: string
): Promise<MediaMutationResponse> {
  const response = await fetch(
    `${API_URL}/api/media/${id}`,
    {
      method: "DELETE",
      credentials: "include",
    }
  );

  const result = await response.json();

  if (!response.ok) {
    throw new Error(
      result.message || "Failed to delete media"
    );
  }

  return result;
}
