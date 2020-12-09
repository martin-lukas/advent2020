document.getElementById('file').addEventListener('change', (event) => {
    const files = event.target.files;
    for (file of files) {
        file.text().then((text) => {
            const input = text
                .replaceAll(/(F|L)/g, '0')
                .replaceAll(/(B|R)/g, '1')
                .split(/\n/)
                .map(line => parseInt(line.trim(), 2));

            const max = Math.max(...input);
            console.log(max);

            const sortedInput = input.sort((a, b) => a - b);
            let missingNum;
            for (let i = 1; i < sortedInput.length; i++) {
                if (sortedInput[i] - sortedInput[i - 1] !== 1) {
                    missingNum = sortedInput[i] - 1;
                    break;
                }
            }
            console.log(missingNum);
        });
    }
});
