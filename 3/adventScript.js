document.getElementById('file').addEventListener('change', (event) => {
    const files = event.target.files;
    for (file of files) {
        file.text().then((text) => {
            const inputMap = text.split(/\n/).map(line => line.trim());
            const calcImpacts = (map, toRight, toDown) => {
                let counter = 0, col = 0;
                for (let row = 0; row < map.length; row += toDown) {
                    if (map[row].charAt(col) === '#') {
                        counter++;
                    }
                    col = (col + toRight) % map[row].length;
                }
                return counter;
            };

            console.log(calcImpacts(inputMap, 3, 1));
            console.log(
                calcImpacts(inputMap, 1, 1)
                * calcImpacts(inputMap, 3, 1)
                * calcImpacts(inputMap, 5, 1)
                * calcImpacts(inputMap, 7, 1)
                * calcImpacts(inputMap, 1, 2)
            );
        });
    }
});