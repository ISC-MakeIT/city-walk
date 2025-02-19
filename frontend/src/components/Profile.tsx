import React from "react";

interface ProfileProps {
    profile: { name: string; age: number; sex: string } | null;
}

const Profile: React.FC<ProfileProps> = ({ profile }) => {
    if (!profile) {
        return <p>プロフィール情報はありません。</p>;
    }

    return (
        <div>
            <h2>プロフィール</h2>
            <p>名前: {profile.name}</p>
            <p>年齢: {profile.age}</p>
            <p>性別: {profile.sex}</p>
        </div>
    );
};

export default Profile;
