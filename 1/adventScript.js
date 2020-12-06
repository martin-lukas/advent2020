document.getElementById('file').addEventListener('change', (event) => {
    const files = event.target.files;
    for (file of files) {
        file.text().then((text) => {
            const input = text.split(/\n/).map(line => parseInt(line.trim()));
            
            let i, j;
            first_outer:
            for (i = 0; i < input.length; i++) {
                for (j = 0; j < input.length; j++) {
                    if (i !== j && input[i] + input[j] === 2020) {
                        break first_outer;
                    }
                }
            }

            console.log(input[i] * input[j]);

            let k, l, m;
            second_outer:
            for (k = 0; k < input.length; k++) {
                for (l = 0; l < input.length; l++) {
                    for (m = 0; m < input.length; m++) {
                        if (k !== l && l !== m && input[k] + input[l] + input[m] === 2020) {
                            break second_outer;
                        }
                    }
                }
            }

            console.log(input[k] * input[l] * input[m]);
        });
    }
});