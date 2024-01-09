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

		if (val === currentName) return;

		if (val.length < 3 || val.length > 12) {
			updateTextStatus(false, 'YOUR NAME MUST BE BETWEEN 3-12 CHARACTERS LONG');
			return;
		}

		// const { ok, text } = await fetch('/api/user/name', {
		// 	method: 'PATCH',
		// 	body: JSON.stringify({ username: val }),
		// }).then((res) => res.json());

		updateTextStatus(true, '');
	};

	const handleUpdateName = async () => {
		const { ok } = await fetch('/api/user/name', {
			method: 'PATCH',
			body: JSON.stringify({ name: newName }),
		}).then((res) => res.json());

		ok && updateTextStatus(true, 'SUCCESS');
		ok && router.refresh();
		setNewName('');
	};

	const updateTextStatus = async (ok: boolean, text: string) => {
		//grab text status element
		const statusText = document.querySelector('#name-status-text');

		const submitBtn = document.querySelector('#name-submit');

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
					{'CHANGE NAME'}
				</h2>
				<hr className='w-full mx-auto mt-2 border-green-500' />
			</div>
			<div className='w-full md:flex md:flex-col md:items-center md:gap-2 md:max-w-4xl'>
				<form className='flex w-full justify-between items-center gap-2 py-3'>
					<input
						placeholder={currentName}
						className='flex-1 text-base p-2 rounded-md outline-none bg-zinc-900 text-green-500 focus:border-none focus:outline-green-500'
						type='text'
						value={newName}
						onChange={(e) => handleValidateName(e.target.value)}
					/>
					<button
						type='button'
						id='name-submit'
						className='font-vcr text-zinc-700'
						onClick={() => handleUpdateName()}
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
