'use client';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

interface EditUsernameFormProps {
	currentUsername: string;
}

const EditUsernameForm = ({ currentUsername }: EditUsernameFormProps) => {
	const [newUsername, setNewUsername] = useState<string>('');
	const router = useRouter();

	const handleValidateUsername = async (val: string) => {
		setNewUsername(val);

		if (val === currentUsername) return toggleSubmit(false);

		if (val.length < 5 || val.length > 20) {
			showValidationStatus(
				'YOUR USERNAME MUST BE BETWEEN 5-20 CHARACTERS LONG'
			);
			toggleSubmit(false);
			return;
		}

		const { ok, text } = await fetch('/api/user/check-username', {
			method: 'PATCH',
			body: JSON.stringify({ username: val }),
		}).then((res) => res.json());

		showValidationStatus(text);
		toggleSubmit(true);
	};

	const showValidationStatus = (text: string) => {
		const statusText = document.querySelector('#username-status-text');
		if (!statusText) return;

		statusText.classList.remove('hidden');
		statusText.innerHTML = text.toUpperCase();

		setTimeout(() => {
			statusText.classList.add('hidden');
		}, 2000);
	};

	const toggleSubmit = async (ok: boolean) => {
		const submitBtn = document.querySelector('#username-submit');
		if (!submitBtn) return;

		//enable submit button if input is valid and disable if not
		ok
			? submitBtn.removeAttribute('disabled')
			: submitBtn.setAttribute('disabled', 'enabled');
	};

	const handleUpdateUsername = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		const { ok, url } = await fetch('/api/user/username', {
			method: 'PATCH',
			body: JSON.stringify({ username: newUsername }),
		}).then((res) => res.json());

		if (!ok) return;

		showValidationStatus('SUCCESS');
		toggleSubmit(false);

		setNewUsername('');

		router.replace(url);
	};

	return (
		<>
			<div className='sticky z-10 flex flex-col w-full pt-2 bg-black top-12'>
				<h2 className='text-sm text-left text-green-500 font-vcr'>
					{'CHANGE USERNAME'}
				</h2>
				<hr className='w-full mx-auto mt-2 border-green-500' />
			</div>
			<div className='w-full md:flex md:flex-col md:items-center md:gap-2 md:max-w-4xl'>
				<form
					className='flex w-full justify-between items-center gap-2 py-3'
					onSubmit={(e) => handleUpdateUsername(e)}
				>
					<input
						required
						minLength={5}
						maxLength={20}
						placeholder={currentUsername}
						className='flex-1 text-base p-2 rounded-md outline-none bg-zinc-900 text-green-500 focus:border-none focus:outline-green-500'
						type='text'
						value={newUsername}
						onChange={(e) => handleValidateUsername(e.target.value)}
					/>
					<button
						type='submit'
						id='username-submit'
						className='font-vcr text-green-500 disabled:text-zinc-700'
						disabled
					>
						SUBMIT
					</button>
					<button
						type='reset'
						className='font-vcr text-green-600'
						onClick={() => handleValidateUsername('')}
					>
						CANCEL
					</button>
				</form>
				<p
					className='hidden text-xs font-vcr text-green-500 md:text-sm'
					id='username-status-text'
				></p>
			</div>
		</>
	);
};
export default EditUsernameForm;
