import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { Select } from 'src/ui/select';
import { RadioGroup } from 'src/ui/radio-group';
import {
	fontFamilyOptions,
	fontSizeOptions,
	fontColors,
	backgroundColors,
	contentWidthArr,
	defaultArticleState,
	ArticleStateType,
} from 'src/constants/articleProps';

import { useState, FormEvent, useEffect, useRef } from 'react';

import styles from './ArticleParamsForm.module.scss';
import clsx from 'clsx';
import { Separator } from 'src/ui/separator';
import { Text } from 'src/ui/text/Text';

interface IArticleParamsFormProps {
	setArticleState: (newState: ArticleStateType) => void;
	articleState: ArticleStateType;
}

export const ArticleParamsForm = ({
	setArticleState,
	articleState,
}: IArticleParamsFormProps) => {
	const [isSidebar, setIsSidebar] = useState(false);
	const [selectedFontFamily, setSelectedFontFamily] = useState(
		articleState.fontFamilyOption
	);
	const [selectedFontSize, setSelectedFontSize] = useState(
		articleState.fontSizeOption
	);
	const [selectedFontColor, setSelectedFontColor] = useState(
		articleState.fontColor
	);
	const [selectedBackgroundColor, setSelectedBackgroundColor] = useState(
		articleState.backgroundColor
	);
	const [selectedContentWidth, setSelectedContentWidth] = useState(
		articleState.contentWidth
	);

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
		setSelectedFontFamily(articleState.fontFamilyOption);
		setSelectedFontSize(articleState.fontSizeOption);
		setSelectedFontColor(articleState.fontColor);
		setSelectedBackgroundColor(articleState.backgroundColor);
		setSelectedContentWidth(articleState.contentWidth);
	}, [articleState]);

	const submitHandler = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setArticleState({
			fontFamilyOption: selectedFontFamily,
			fontColor: selectedFontColor,
			backgroundColor: selectedBackgroundColor,
			contentWidth: selectedContentWidth,
			fontSizeOption: selectedFontSize,
		});
	};

	const resetHandler = () => {
		setArticleState({
			fontFamilyOption: defaultArticleState.fontFamilyOption,
			fontColor: defaultArticleState.fontColor,
			backgroundColor: defaultArticleState.backgroundColor,
			contentWidth: defaultArticleState.contentWidth,
			fontSizeOption: defaultArticleState.fontSizeOption,
		});
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
							selected={selectedFontFamily}
							options={fontFamilyOptions}
							title={'Категория'}
							onChange={(selected) => setSelectedFontFamily(selected)}
						/>
						<RadioGroup
							selected={selectedFontSize}
							options={fontSizeOptions}
							title={'Размер шрифта'}
							name={'font-size'}
							onChange={(selected) => setSelectedFontSize(selected)}
						/>
						<Select
							selected={selectedFontColor}
							options={fontColors}
							title={'Цвет шрифта'}
							onChange={(selected) => setSelectedFontColor(selected)}
						/>

						<Separator />

						<Select
							selected={selectedBackgroundColor}
							options={backgroundColors}
							title={'Цвет фона'}
							onChange={(selected) => setSelectedBackgroundColor(selected)}
						/>
						<Select
							selected={selectedContentWidth}
							options={contentWidthArr}
							title={'Ширина контента'}
							onChange={(selected) => setSelectedContentWidth(selected)}
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
