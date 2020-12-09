document.getElementById('file').addEventListener('change', (event) => {
    const files = event.target.files;
    for (file of files) {
        file.text().then((text) => {
            const input = text.split(/\n\s*\n/).map(line => line.trim().replace(/\s*\n\s*/, ' '));

            const isNumberInRangeInclusive = (num, min, max) => {
                return num >= min && num <= max;
            };

            let validCount = 0;
            for (const line of input) {
                const fields = line.split(/\s/).filter(field => field !== '');
                if (fields.length >= 7) {
                    if (fields.length === 8 || fields.filter(field => field.startsWith('cid')).length === 0) {
                        let isValid = true;
                        for (const field of fields) {
                            const [key, value] = field.split(':');
                            switch (key) {
                                case 'byr':
                                    isValid = value.length === 4 && isNumberInRangeInclusive(parseInt(value), 1920, 2002);
                                    break;
                                case 'iyr':
                                    isValid = value.length === 4 && isNumberInRangeInclusive(parseInt(value), 2010, 2020);
                                    break;
                                case 'eyr':
                                    isValid = value.length === 4 && isNumberInRangeInclusive(parseInt(value), 2020, 2030);
                                    break;
                                case 'hgt':
                                    const matches = value.match(/(\d+)(cm|in)/);
                                    if (!matches) {
                                        isValid = false;
                                    } else {   
                                        const [, numVal, unit] = matches;
                                        if (unit === 'cm') {
                                            isValid = isNumberInRangeInclusive(parseInt(numVal), 150, 193);
                                        } else if (unit === 'in') {
                                            isValid = isNumberInRangeInclusive(parseInt(numVal), 59, 76);
                                        }
                                    }
                                    break;
                                case 'hcl':
                                    isValid = !!value.match(/^#[a-f0-9]{6}$/);
                                    break;
                                case 'ecl':
                                    isValid = !!value.match(/(amb|blu|brn|gry|grn|hzl|oth)/);
                                    break;
                                case 'pid':
                                    isValid = !!value.match(/^\d{9}$/);
                                    break;
                            }
                            if (!isValid) {
                                break;
                            }
                        }

                        if (isValid) {
                            validCount++;
                        }
                    }
                }
            }

            console.log(validCount);
        });
    }
});
