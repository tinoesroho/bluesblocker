import clown from '../assets/clown.png';
export interface Settings {
	action: 'block' | 'mute' | 'follow' | 'replace';
	replaceUrl: string;
	actionOnFollowingAccounts: boolean;
	actionOnFollowedByAccounts: boolean;
	actionOnVerifiedAccounts: boolean;
	followedOtto: boolean;
	whitelistedUsers: { id: string; name: string }[];
	actionQueue: {
		id: string;
		action: Settings['action'];
		doneAt?: number;
	}[];
}

export const settingsDefaults: Settings = {
	action: 'mute',
	replaceUrl: clown,
	actionOnFollowingAccounts: false,
	followedOtto: false,
	actionOnFollowedByAccounts: false,
	actionOnVerifiedAccounts: true,
	whitelistedUsers: [],
	actionQueue: [],
};
