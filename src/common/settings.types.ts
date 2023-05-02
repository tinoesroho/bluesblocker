import clown from '../assets/clown.png';
export interface Settings {
	action: 'block' | 'mute' | 'follow' | 'replace';
	replaceUrl: string;
	actionOnFollowingAccounts: boolean;
	actionOnFollowedByAccounts: boolean;
	actionOnVerifiedAccounts: boolean;
	slowYourRoll: number;
	followedOtto: boolean;
	whitelistedUsers: { id: string; name: string }[];
	actionQueue: {
		id: string;
		action: Settings['action'];
		doneAt?: number;
	}[];
}

export const settingsDefaults: Settings = {
	action: 'block',
	replaceUrl: clown,
	slowYourRoll: 10,
	actionOnFollowingAccounts: false,
	followedOtto: false,
	actionOnFollowedByAccounts: false,
	actionOnVerifiedAccounts: true,
	whitelistedUsers: [],
	actionQueue: [],
};
