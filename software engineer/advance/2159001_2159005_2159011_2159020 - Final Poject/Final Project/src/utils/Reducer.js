import { reducerCases } from "./Constants";

const playlistIdPool = [
  "2YRe7HRKNRvXdJBp9nXFza",
  "37i9dQZEVXbNxXF4SkHj9F",
  "37i9dQZEVXbLdGSmz6xilI",
  "37i9dQZEVXbLRQDuF5jeBp",
  "37i9dQZEVXbLnolsZ8PSNw",
];

const getRandomPlaylistId = () => {
  const randomIndex = Math.floor(Math.random() * playlistIdPool.length);
  return playlistIdPool[randomIndex];
};

export const initialState = {
  token: null,
  userInfo: null,
  playlists: [],
  currentPlaying: null,
  playerState: false,
  selectedPlaylist: null,
  selectedPlaylistId: getRandomPlaylistId(),
  selectedArtist:null,
  followingArtist:null,
};

const reducer = (state, action) => {
  switch (action.type) {
    case reducerCases.SET_TOKEN:
      return {
        ...state,
        token: action.token,
      };
    case reducerCases.SET_USER:
      return {
        ...state,
        userInfo: action.userInfo,
      };
    case reducerCases.SET_PLAYLISTS:
      return {
        ...state,
        playlists: action.playlists,
      };
    case reducerCases.SET_PLAYING:
      return {
        ...state,
        currentPlaying: action.currentPlaying,
      };
    case reducerCases.SET_PLAYER_STATE:
      return {
        ...state,
        playerState: action.playerState,
      };
    case reducerCases.SET_PLAYLIST:
      return {
        ...state,
        selectedPlaylist: action.selectedPlaylist,
      };
    case reducerCases.SET_PLAYLIST_ID:
      return {
        ...state,
        selectedPlaylistId: action.selectedPlaylistId,
      };
    case reducerCases.SET_ARTISTS:
      return {
        ...state,
        selectedArtist: action.selectedArtist,
      };
    case reducerCases.SET_FOLLOW_ARTISTS:
      return {
        ...state,
        followingArtist: action.followingArtist,
      };
      
    default:
      return state;
  }
};

export default reducer;
