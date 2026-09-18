"use client";

import { useCallback, useEffect, useState } from "react";

import {
getMedia,
getMediaById,
createMedia,
deleteMedia,
} from "../services/media.service";
import { CreateMediaRequest, Media } from "../types/media";


export function useMedia() {
const [media, setMedia] = useState<Media[]>([]);
const [loading, setLoading] = useState(true);
const [error, setError] = useState<string | null>(null);

const fetchMedia = useCallback(async () => {
try {
setError(null);

  const result = await getMedia();

  setMedia(result.data);
} catch (err) {
  setError(
    err instanceof Error
      ? err.message
      : "Failed to fetch media"
  );
}

}, []);

useEffect(() => {
let mounted = true;

async function loadMedia() {
  try {
    const result = await getMedia();

    if (mounted) {
      setMedia(result.data);
      setError(null);
    }
  } catch (err) {
    if (mounted) {
      setError(
        err instanceof Error
          ? err.message
          : "Failed to fetch media"
      );
    }
  } finally {
    if (mounted) {
      setLoading(false);
    }
  }
}

loadMedia();

return () => {
  mounted = false;
};

}, []);

async function fetchMediaById(id: string) {
return getMediaById(id);
}

async function addMedia(data: CreateMediaRequest) {
const result = await createMedia(data);

await fetchMedia();

return result;

}

async function removeMedia(id: string) {
const result = await deleteMedia(id);

await fetchMedia();

return result;
}

return {
media,
loading,
error,
fetchMedia,
fetchMediaById,
addMedia,
removeMedia,
};
}
