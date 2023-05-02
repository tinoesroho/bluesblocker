import React, { useEffect, useMemo, useState } from 'react';
import { Settings, settingsDefaults } from '../../common/settings.types';
import { addItemToList } from '../../common/util';

const App = ({
	initialSettings,
}: {
	initialSettings: Settings;
}): JSX.Element => {
	const [settings, setSettings] = useState(initialSettings);

	useEffect(() => {
		chrome.storage.onChanged.addListener(async (_, area) => {
			if (area !== 'local') return;
			chrome.storage.local.get((settings) =>
				setSettings({ ...settingsDefaults, ...settings } as Settings)
			);
		});
	}, []);

	const setSetting = <T extends keyof Settings>(
		setting: T,
		value: Settings[T]
	) => {
		chrome.storage.local.set({ [setting]: value });
	};

	const removeWhitelist = (id: string) => {
		chrome.storage.local.set({
			whitelistedUsers: settings.whitelistedUsers.filter((u) => u.id !== id),
		});
	};

	const action =
		settings.action[0].toUpperCase() + settings.action.substring(1);

	const [totalBlocked, totalPending] = useMemo(() => {
		let totalBlocked = 0;
		let totalPending = 0;
		for (const item of settings.actionQueue) {
			if (item.doneAt) totalBlocked++;
			else totalPending++;
		}
		return [totalBlocked, totalPending];
	}, [settings.actionQueue]);

	const handleFollow = () => {
		setSetting('followedOtto', true);
		addItemToList(
			'actionQueue',
			{
				id: '903244989206892544',
				action: 'follow',
			},
			'prepend'
		);
	};
	
	const exportWhitelist = () => {
chrome.storage.local.get(['whitelistedUsers'], function(result) {
  var textToSave = JSON.stringify(result.whitelistedUsers);
  var hiddenElement = document.createElement('a');
  hiddenElement.href = 'data:text/plain;charset=utf-8,' + encodeURIComponent(textToSave);
  hiddenElement.target = '_blank';
  hiddenElement.download = 'whitelistedUsers.txt';
  hiddenElement.click();
});
};

const exportTestFile = () => {
chrome.storage.local.get(['testImport'], function(result) {
  var textToSave = JSON.stringify(result.testImport);
  var hiddenElement = document.createElement('a');
  hiddenElement.href = 'data:text/plain;charset=utf-8,' + encodeURIComponent(textToSave);
  hiddenElement.target = '_blank';
  hiddenElement.download = 'testExport.txt';
  hiddenElement.click();
});
};

const dofileRequiredFunctionality  = () => {
  let input = document.createElement('input');
  input.type = 'file';
  input.onchange = _ => {
    // you can use this method to get file and perform respective operations
    const file = input.files[0];
	saveFileToLocalStorage(file);

	console.log(file);
        };
  input.click();
  
};
function readFile(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsText(file);
  });
}

/*
async function saveFileToLocalStorage(file) {
  const fileContent = await readFile(file);
  const parsedImport = JSON.parse(fileContent);
  chrome.storage.local.set({ 'whitelistedUsers': parsedImport }, () => {
    console.log('Value is set to ' + fileContent);
  });
}
*/
async function saveFileToLocalStorage(file) {
  const fileContent = await readFile(file);
  const parsedImport = JSON.parse(fileContent);

  chrome.storage.local.get(['whitelistedUsers'], (result) => {
    const currentWhitelistedUsers = result.whitelistedUsers || [];

    // Append the contents of the file to 'whitelistedUsers'
    const newWhitelistedUsers = [...currentWhitelistedUsers, ...parsedImport];
    chrome.storage.local.set({ whitelistedUsers: newWhitelistedUsers }, () => {
      console.log('File contents appended to whitelistedUsers');
    });
  });
}

const resetQueueSettingsWhitelistGo = () => {
chrome.storage.local.clear();
};
	return (
		<div>
			<div className="totals">
				{totalBlocked} total blocked
				{totalPending > 0 ? `, ${totalPending} pending` : ''}
			</div>
			<div className="row">
				<img src="/assets/icon128.png" width={48} height={48} />
				<h1>BluesBlocker Options</h1>
			</div>
			{!settings.followedOtto && (
				<button className="follow-btn" onClick={handleFollow}>
					Follow @Ottomated_
				</button>
			)}
								<button id="saveWhitelist" onClick={exportWhitelist}>save whitelist</button> <button id="importReplacementWhitelist" onClick={dofileRequiredFunctionality}>load whitelist</button><button id="resetQueueSettingsWhitelist" onClick={resetQueueSettingsWhitelistGo}>clear everything</button>
			<div className="row">
				<select
					id="action"
					className="dropdown"
					value={settings.action}
					onChange={(ev) =>
						setSetting(
							'action',
							ev.target.value as 'block' | 'mute' | 'replace'
						)
					}
				>
					<option value="block">Block</option>
					<option value="mute">Mute</option>
					<option value="replace">Replace PFP</option>
				</select>
				<label htmlFor="action">
					{settings.action === 'replace' ? 'on ' : ''}detected accounts
				</label>
			</div>
			<p className="help-text">
				BluesBlocker doesn't block accounts immediately - it schedules them to be
				blocked in the background to avoid Twitter's bot detection.
			</p>
			<div className="row">
			<label htmlFor="slowYourRoll">Action Delay Timer</label>
			<input id="slowYourRoll" type="number" value={settings.slowYourRoll} onChange={(ev) =>setSetting('slowYourRoll', ev.target.value)} />
			</div>
			<div className="row">
				<input
					id="followed-by"
					type="checkbox"
					checked={settings.actionOnFollowedByAccounts}
					onChange={(ev) =>
						setSetting('actionOnFollowedByAccounts', ev.target.checked)
					}
				/>
				<label htmlFor="followed-by">{action} accounts that follow you</label>
			</div>
			<div className="row">
				<input
					id="following"
					type="checkbox"
					checked={settings.actionOnFollowingAccounts}
					onChange={(ev) =>
						setSetting('actionOnFollowingAccounts', ev.target.checked)
					}
				/>
				<label htmlFor="following">{action} accounts that you follow</label>
			</div>
			<div className="row">
				<input
					id="verified"
					type="checkbox"
					checked={settings.actionOnVerifiedAccounts}
					onChange={(ev) =>
						setSetting('actionOnVerifiedAccounts', ev.target.checked)
					}
				/>
				<label htmlFor="following">{action} verified accounts</label>
			</div>
			{settings.whitelistedUsers.length > 0 && (
				<>
					<h3>Whitelisted Users</h3>
					<p className="help-text">
						Users are whitelisted when you press "UNDO" in the BluesBlocker popup.
					</p>
					<div className="whitelist">
						{settings.whitelistedUsers.map((user) => (
							<div
								className="whitelist-entry"
								key={user.id}
								data-userid={user.id}
							>
								<span>@{user.name}</span>
								<a
									href="#"
									onClick={() => removeWhitelist(user.id)}
									className="unwhitelist"
								>
									un-whitelist
								</a>
							</div>
						))}
					</div>
				</>
			)}
		</div>
	);
};

export default App;
