var csv = require('csv-stream')
var request = require('request')
var fs = require('fs')
var matx = [];
var options = {
    delimiter : ',', 
    endLine : '\n', 
    columns : ['id', 'json'],
    enclosedChar : '"'
}

function listToMatrix(list, elementsPerSubArray) {
    var matrix = [], i, k;

    for (i = 0, k = -1; i < list.length; i++) {
        if (i % elementsPerSubArray === 0) {
            k++;
            matrix[k] = [];
        }

        matrix[k].push(list[i]);
    }

    return matrix;
}

function main() {
    const inputFile = process.argv[2]
    if (inputFile === undefined){
        console.error('csv test file should be defined')
        return ;
    }
    console.log("id,json,is_valid")

    var csvStream = csv.createStream(options);
    fs.createReadStream(inputFile)
	.pipe(csvStream)
	.on('data',function(data){
        if (data['id']!=='id'){
            const jsonData = JSON.parse(data['json'])
            const result = []
            const isValid = Number.isInteger(Math.sqrt(jsonData.length))
            if (isValid){
                const matrixSize = Math.sqrt(jsonData.length)
                let matrix = [];     
            }

        matx = listToMatrix(jsonData, Math.sqrt(jsonData.length))
        let matLength = Math.sqrt(jsonData.length)
        if (isValid){


        let N = matLength;
        for (let step = 0 ; step < matLength/2 ; step++) {
            let corner = matx[step][step];

            // right
            for (let j = step + 1 ; j < N - step; j++) {
                [corner, matx[step][j]] = [matx[step][j], corner]

            }

            // down
            for (let i = step + 1  ; i < N - step ; i++) {
                [corner, matx[i][N-step-1]] = [matx[i][N-step-1], corner]

            }

            // left
            for (let j = N - step - 2  ; j > step ; j--) {
                [corner, matx[N-step-1][j]] = [matx[N-step-1][j], corner]

            }

            // up
            for (let i = N - step - 1  ; i > step ; i--) {
                [corner, matx[i][step]] = [matx[i][step], corner]

            }

            [corner, matx[step][step]] = [matx[step][step], corner]


        }
  
        let list = [];
        for (let i = 0 ; i < matLength ; i++) {
            for (let j = 0 ; j < matLength ; j++) {
                list.push(matx[i][j]);

            }

        }

        console.log(data['id'] + ",[" + list.toString() + "]," + isValid)

    } else
    console.log(data['id'] + ",[ ]," + isValid)


        }
	})
    
}

main();
