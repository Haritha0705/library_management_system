export interface UserProfile {
    name: string;
    email: string;
    role: string;
    profilePic: string;
    bio?: string;
}

export const user: UserProfile = {
    name: "Haritha Perera",
    email: "haritha@example.com",
    role: "Student",
    profilePic: "https://i.pravatar.cc/150?img=3",
    bio: "Second-year Software Engineering student passionate about frontend development and AI."
};