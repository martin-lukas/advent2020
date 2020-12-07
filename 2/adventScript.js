document.getElementById('file').addEventListener('change', (event) => {
    const files = event.target.files;
    for (file of files) {
        file.text().then((text) => {
            const input = text.split(/\n/).map(line => line.trim());

            let validCount = 0;
            for (const line of input) {
                const [, min, max, char, passwd] = line.match(/(\d+)-(\d+)\s(\w):\s(\w+)/);
                let charCount = 0;
                for (let i = 0; i < passwd.length; i++) {
                    if (passwd.charAt(i) === char) {
                        charCount++;
                    }
                }
                if (charCount >= parseInt(min) && charCount <= parseInt(max)) {
                    validCount++;
                }
            }

            console.log(validCount);
            
            validCount = 0;
            for (const line of input) {
                const [, firstPos, secondPos, char, passwd] = line.match(/(\d+)-(\d+)\s(\w):\s(\w+)/);
                let matches = 0;
                if (passwd.charAt(parseInt(firstPos - 1)) === char) matches++;
                if (passwd.charAt(parseInt(secondPos - 1)) === char) matches++;
                
                if (matches === 1) {
                    validCount++;
                }
            }

            console.log(validCount);
        });
    }
});