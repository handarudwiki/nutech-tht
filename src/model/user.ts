
export interface User {
    id: string;
    email: string;
	password: string;
	first_name: string;
	last_name?: string;
	profile_image?: string;
}

export interface UserResponse {
	id: string;
	email: string;
	first_name: string;
	last_name?: string;
	profile_image?: string;
}