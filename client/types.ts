export type Artist = {
    id: string;
    name: string;
    images: Array<{ url: string }>,
    genres: string[];
    external_urls: { spotify: string };
};

export type Album = {
    id: string;
    name: string;
    images: Array<{ url: string }>,
    release_date: string;
    genres: string[];
    album_type: string;
    external_urls: { spotify: string };
};

export type SpotifyToken = {
    access_token: string | null;
};

export type TimeRange = 'long_term' | 'medium_term' | 'short_term';
