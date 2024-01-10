'use client';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

interface EditNameFormProps {
	currentName: string;
}

const EditNameForm = ({ currentName }: EditNameFormProps) => {
	const [newName, setNewName] = useState<string>('');
	const router = useRouter();

	const handleValidateName = async (val: string) => {
		setNewName(val);

		if (val === currentName) return toggleSubmit(false);

		if (val.length < 3 || val.length > 12) {
			showValidationStatus('YOUR NAME MUST BE BETWEEN 3-12 CHARACTERS LONG');
			toggleSubmit(false);
			return;
		}

		toggleSubmit(true);
	};

	const showValidationStatus = (text: string) => {
		const statusText = document.querySelector('#name-status-text');
		if (!statusText) return;

		statusText.classList.remove('hidden');
		statusText.innerHTML = text.toUpperCase();

		setTimeout(() => {
			statusText.classList.add('hidden');
		}, 2000);
	};

	const toggleSubmit = async (ok: boolean) => {
		const submitBtn = document.querySelector('#name-submit');
		if (!submitBtn) return;

		//enable submit button if input is valid and disable if not
		ok
			? submitBtn.removeAttribute('disabled')
			: !submitBtn.hasAttribute('disabled') &&
			  submitBtn.toggleAttribute('disabled');
	};

	const handleUpdateName = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		const { ok } = await fetch('/api/user/name', {
			method: 'PATCH',
			body: JSON.stringify({ name: newName }),
		}).then((res) => res.json());

		showValidationStatus('SUCCESS');
		toggleSubmit(false);

		setNewName('');

		router.refresh();
	};

	return (
		<>
			<div className='sticky z-10 flex flex-col w-full pt-2 bg-black top-12'>
				<h2 className='text-sm text-left text-green-500 font-vcr'>
					{'CHANGE DISPLAY NAME'}
				</h2>
				<hr className='w-full mx-auto mt-2 border-green-500' />
			</div>
			<div className='w-full md:flex md:flex-col md:items-center md:gap-2 md:max-w-4xl'>
				<form
					className='flex w-full justify-between items-center gap-2 py-3'
					onClick={(e) => handleUpdateName(e)}
				>
					<input
						required
						minLength={3}
						maxLength={12}
						placeholder={currentName}
						className='flex-1 text-base p-2 rounded-md outline-none bg-zinc-900 text-green-500 focus:border-none focus:outline-green-500'
						type='text'
						value={newName}
						onChange={(e) => handleValidateName(e.target.value)}
					/>
					<button
						type='submit'
						id='name-submit'
						className='font-vcr  text-green-500 disabled:text-zinc-700'
						disabled
					>
						SUBMIT
					</button>
					<button
						type='reset'
						className='font-vcr text-green-600'
						onClick={(e) => handleValidateName('')}
					>
						CANCEL
					</button>
				</form>
				<p
					className='hidden text-xs font-vcr text-green-500 md:text-sm'
					id='name-status-text'
				></p>
			</div>
		</>
	);
};
export default EditNameForm;
