'use client';
import { useState } from 'react';

interface EditUsernameToggleProps {}

export const EditUsernameToggle = ({}: EditUsernameToggleProps) => {
	const toggleInput = async () => {
		const toggle = document.querySelector('button#username-field-toggle');
		const form = document.querySelector('form#username-field');
		if (toggle && form) {
			toggle.classList.toggle('hidden');
			form.classList.toggle('hidden');
			form.classList.toggle('flex');
		}
	};

	return (
		<button
			className='py-1 text-sm text-green-500 font-vcr'
			onClick={() => toggleInput()}
			id='username-field-toggle'
		>
			CHANGE USERNAME
		</button>
	);
};
