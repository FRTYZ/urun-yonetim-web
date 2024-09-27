export const NumberInput = (event: React.ChangeEvent<HTMLInputElement>, startNumber: number = 0) => {
    const inputValue = event.target.value;

    if (inputValue === '' || (/^\d+$/.test(inputValue) && Number(inputValue) >= startNumber)) {
        return inputValue
    }
};
