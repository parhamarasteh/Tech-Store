export interface Media {
  _id: string;
  url: string;
  createdAt: string;
  updatedAt: string;
}

export interface MediaResponse {
  success: boolean;
  data: Media[];
}

export interface CreateMediaRequest {
    url: string;
  }
  
  export interface SingleMediaResponse {
    success: boolean;
    data: Media;
  }
  
  export interface MediaMutationResponse {
    success: boolean;
    message: string;
    data?: Media;
    mediaId?: string;
  }