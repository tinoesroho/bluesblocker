import clown from '../assets/clown.png';
export interface Settings {
	action: 'block' | 'mute' | 'follow' | 'replace';
	replaceUrl: string;
	actionOnFollowingAccounts: boolean;
	actionOnFollowedByAccounts: boolean;
	actionOnVerifiedAccounts: boolean;
	slowYourRoll: number;
	silenceAlerts: boolean;
	followedOtto: boolean;
	blockBigAccounts: boolean;
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
	silenceAlerts: false,
	blockBigAccounts: false,
	actionOnFollowingAccounts: false,
	followedOtto: false,
	actionOnFollowedByAccounts: false,
	actionOnVerifiedAccounts: true,
	whitelistedUsers: [],
	actionQueue: [],
};
