export type AcceptanceTokenResponseDto = {
  data: {
    id: string;
    presigned_acceptance: {
      acceptance_token: string;
    };
  };
};
