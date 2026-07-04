export interface CurrentUser {
    id: string;
    email: string;
    name: string;
    image: string | null;
    emailVerified: boolean;
}