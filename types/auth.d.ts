export type LoginPayload = {
    email : string;
    password : string;
}
export type SignUpPayload = {
    email : string;
    password : string;
    name : string;
}
export type SignUpResponse = {
    success : boolean;
    error ?: string;
}
export type LoginResponse = {
    success : boolean;
    error ?: string;
}