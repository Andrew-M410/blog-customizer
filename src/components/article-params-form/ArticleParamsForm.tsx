import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { Select } from 'src/ui/select';
import { RadioGroup } from 'src/ui/radio-group';
import { Separator } from 'src/ui/separator';
import { Text } from 'src/ui/text/Text';
import {
	fontFamilyOptions,
	fontSizeOptions,
	fontColors,
	backgroundColors,
	contentWidthArr,
	defaultArticleState,
	ArticleStateType,
	OptionType,
} from 'src/constants/articleProps';

import { useState, FormEvent, useEffect, useRef } from 'react';

import styles from './ArticleParamsForm.module.scss';
import clsx from 'clsx';

interface IArticleParamsFormProps {
	setArticleState: (newState: ArticleStateType) => void;
	articleState: ArticleStateType;
}

export const ArticleParamsForm = ({
	setArticleState,
	articleState,
}: IArticleParamsFormProps) => {
	const [isSidebar, setIsSidebar] = useState(false);
	const [formState, setFormState] =
		useState<ArticleStateType>(defaultArticleState);
	const updateFormField = (field: keyof ArticleStateType) => {
		return (value: OptionType) => {
			setFormState((prev) => ({
				...prev,
				[field]: value,
			}));
		};
	};

	const isSidebarHandler = () => {
		setIsSidebar(!isSidebar);
	};

	const containerRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (!isSidebar) return;

		const handleOffClick = (e: MouseEvent) => {
			if (
				containerRef.current &&
				!containerRef.current.contains(e.target as Node)
			) {
				setIsSidebar(false);
			}
		};

		document.addEventListener('mousedown', handleOffClick);

		return () => {
			document.removeEventListener('mousedown', handleOffClick);
		};
	}, [isSidebar]);

	useEffect(() => {
		setFormState(articleState);
	}, [articleState]);

	const submitHandler = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setArticleState(formState);
	};

	const resetHandler = () => {
		setArticleState(defaultArticleState);
	};

	return (
		<div ref={containerRef}>
			<ArrowButton isOpen={isSidebar} onClick={isSidebarHandler} />
			<aside
				className={clsx(styles.container, {
					[styles.container_open]: isSidebar,
				})}>
				<form className={styles.form} onSubmit={submitHandler}>
					<div className={styles.bottomContainer}>
						<Text size={31} weight={800}>
							Задайте параметры
						</Text>
						<Select
							selected={formState.fontFamilyOption}
							options={fontFamilyOptions}
							title={'Категория'}
							onChange={updateFormField('fontFamilyOption')}
						/>
						<RadioGroup
							selected={formState.fontSizeOption}
							options={fontSizeOptions}
							title={'Размер шрифта'}
							name={'font-size'}
							onChange={updateFormField('fontSizeOption')}
						/>
						<Select
							selected={formState.fontColor}
							options={fontColors}
							title={'Цвет шрифта'}
							onChange={updateFormField('fontColor')}
						/>

						<Separator />

						<Select
							selected={formState.backgroundColor}
							options={backgroundColors}
							title={'Цвет фона'}
							onChange={updateFormField('backgroundColor')}
						/>
						<Select
							selected={formState.contentWidth}
							options={contentWidthArr}
							title={'Ширина контента'}
							onChange={updateFormField('contentWidth')}
						/>
						<div className={styles.buttonsContainer}>
							<Button
								title='Сбросить'
								htmlType='reset'
								type='clear'
								onClick={resetHandler}
							/>
							<Button title='Применить' htmlType='submit' type='apply' />
						</div>
					</div>
				</form>
			</aside>
		</div>
	);
};
