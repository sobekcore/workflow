export interface UseMutationParams {
  onSuccess?(): void;
  onError?(error: Error): void;
}
