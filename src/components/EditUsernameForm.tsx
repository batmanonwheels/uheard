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

		if (val === currentUsername) return;

		if (val.length < 5) {
			updateTextStatus(
				false,
				'YOUR USERNAME MUST BE BETWEEN 5-20 CHARACTERS LONG'
			);
			return;
		}

		const { ok, text } = await fetch('/api/check-username', {
			method: 'PATCH',
			body: JSON.stringify({ username: val }),
		}).then((res) => res.json());

		updateTextStatus(ok, text);
	};

	const handleUpdateUsername = async () => {
		const { ok, url } = await fetch('/api/username', {
			method: 'PATCH',
			body: JSON.stringify({ username: newUsername }),
		}).then((res) => res.json());

		console.log(ok);

		ok && updateTextStatus(true, 'SUCCESS');
		ok && router.replace(url);
	};

	const updateTextStatus = async (ok: boolean, text: string) => {
		//grab text status element
		const statusText = document.querySelector('#status-text');

		const submitBtn = document.querySelector('#submit');

		//confirm its non-nullness
		if (!statusText || !submitBtn) return;

		//toggle visibility for 3 seconds
		statusText.classList.remove('hidden');

		if (!ok) {
			statusText.innerHTML = text.toUpperCase();
			submitBtn.toggleAttribute('disabled');
			if (submitBtn.classList.contains('text-green-500')) {
				submitBtn.classList.remove('text-green-500');
				submitBtn.classList.add('text-zinc-700');
			}
		}

		if (ok) {
			statusText.innerHTML = text.toUpperCase();
			submitBtn.hasAttribute('disabled') &&
				submitBtn.toggleAttribute('disabled');
			if (submitBtn.classList.contains('text-zinc-700')) {
				submitBtn.classList.remove('text-zinc-700');
				submitBtn.classList.add('text-green-500');
			}
		}

		setTimeout(() => {
			statusText.classList.add('hidden');
		}, 2000);
	};

	return (
		<>
			<div className='sticky z-10 flex flex-col w-full pt-2 bg-black top-12'>
				<h2 className='text-sm text-left text-green-500 font-vcr'>
					{'EDIT USERNAME'}
				</h2>
				<hr className='w-full mx-auto mt-2 border-green-500' />
			</div>
			<div className='w-full md:flex md:flex-col md:items-center md:gap-2 md:max-w-4xl'>
				<form className='flex w-full justify-between items-center gap-2 py-3'>
					<input
						placeholder={currentUsername}
						className='flex-1 text-base p-2 rounded-md outline-none bg-zinc-900 text-green-500 focus:border-none focus:outline-green-500'
						type='text'
						value={newUsername}
						onChange={(e) => handleValidateUsername(e.target.value)}
					/>
					<button
						type='button'
						id='submit'
						className='font-vcr text-zinc-700'
						onClick={() => handleUpdateUsername()}
					>
						SUBMIT
					</button>
					<button
						type='reset'
						className='font-vcr text-green-600'
						onClick={(e) => handleValidateUsername('')}
					>
						CANCEL
					</button>
				</form>
				<p
					className='hidden text-xs font-vcr text-green-500 md:text-sm'
					id='status-text'
				></p>
			</div>
		</>
	);
};
export default EditUsernameForm;
