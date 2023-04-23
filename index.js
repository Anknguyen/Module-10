const fs = require('fs');
const rl = require('readline-sync');

const Managerquestions = [
    "Manager's name? ",
    "Enter manager's ID: ",
    "Enter manager's email: ",
    "Enter manager's office number: "
    ];
    
const Engineerquestions = [
    "Engineer's name? ",
    "Enter engineer's ID: ",
    "Enter engineer's email: ",
    "Enter engineer's Github: "
    ];
    
const Internquestions = [
    "Intern's name? ",
    "Enter intern's ID: ",
    "Enter intern's email: ",
    "Enter intern's school: "
    ];

function start() {
    const answers = [];
    for (question of Managerquestions){
        var ans = rl.question(question);
        answers.push(ans);
    }
    // Save Card with answers
  
    const cardContent = fs.readFileSync('Management.html', 'utf-8');
    
    const card = cardContent
    .replace('{{Name}}', answers[0])
    .replace('{{ID}}', answers[1])
    .replace('{{Email}}', answers[2])
    .replace('{{OfficeNum}}', answers[3]);
    
    fs.writeFileSync('ManagementCard.html', card, 'utf-8');
    fs.writeFileSync('EngineerCard.html', '', 'utf-8');
    fs.writeFileSync('InternCard.html', '', 'utf-8');

    // E or I question
    makeDecision();
}

function makeDecision() {
    var continueQuestion = true;
    var answers1 = [];
    var answers2 = [];
    const cardEng = fs.readFileSync('Engineer.html', 'utf-8');
    const cardIntern = fs.readFileSync('Intern.html', 'utf-8');

    do {
        var decision = rl.question("enter E or I ? (Press anything else to end)");

        if (decision === 'e' || decision === 'E' ) {
            console.log('decision : E ');
            for (question of Engineerquestions){
                var ans = rl.question(question);
                answers1.push(ans);
            }
            // Save Card with answers1
            const card = cardEng
            .replace('{{Name}}', answers1[0])
            .replace('{{ID}}', answers1[1])
            .replace('{{Email}}', answers1[2])
            .replace('{{Github}}', answers1[3]);
            
            fs.appendFileSync('EngineerCard.html', card);

            // and then clear answers1
            answers1 = []
    
        } else if (decision === 'i' || decision === 'I') {
            console.log('decision : I ');
            for (question of Internquestions){
                var ans = rl.question(question);
                answers2.push(ans);
            }
            // Save Card with answers2
            const iCard = cardIntern
            .replace('{{Name}}', answers2[0])
            .replace('{{ID}}', answers2[1])
            .replace('{{Email}}', answers2[2])
            .replace('{{School}}', answers2[3]);
            
            fs.appendFileSync('InternCard.html', iCard);

            // and then clear answers2
            answers2 = []
    
        } else {
            console.log('decision : End');
            // Otherwise quit the Do-While Loop 
            continueQuestion = false;
            const management = fs.readFileSync('ManagementCard.html');
            const engineer = fs.readFileSync('EngineerCard.html');
            const intern = fs.readFileSync('InternCard.html');

            const total = management + engineer + intern;

            const template = fs.readFileSync('template.html', 'utf-8');
            const finalTemp = template.replace('{{Card}}', total)
            
            fs.writeFileSync('index.html',finalTemp);
        }
    
    } while (continueQuestion)
}

start();
