const SDVC = require('@zedeid-sdk/sd-vc-lib');
const {issue, present, verify, verifyVC} = SDVC;

const signerPrivateKey = '4aff9e49a235891af8b6b75b08eba5eab0e3ac9c8b1af5ef4948bce72fa37fea'
const signerPublicKey = '031cc244b67b82fd1be2ff51528f56a5cb5957fb8daabc58e910c99808e001a14f'

const holderPrivateKey = 'd13ab9620b19cdd5a05f16301e28cd2c8fa5fd66b493a9efda7d45c0632dfa72'
const holderPublicKey = '0370546a93353bf27e30e97b043f1ffea8da953b0ca44fad77060c261982bf7678'


function issueVC(){
    //claims object. can pass any claim as a key:value pair
    const claims = {name: 'John Doe', birthday: '1989/04/01'};
    // to issue a VC signerPrivateKey and holderPublicKey is required
    // in here signer is the VC issuing party
    const vc = issue(claims, signerPrivateKey, holderPublicKey);
    console.log('issued vc', vc)
}

async function verifyVCs() {
    const vc = {
        type: 'VerifiableCredential',
        issuer: {
            did: 'did:ethr:0x6Ed63aaec40A124169C8E95d95dF0aBA512231d4',
            publicKey: '031cc244b67b82fd1be2ff51528f56a5cb5957fb8daabc58e910c99808e001a14f'
        },
        subject: {
            did: 'did:ethr:0xF3c3D51455Dc0b0b050fc4082a92cf5462e79776',
            publicKey: '0370546a93353bf27e30e97b043f1ffea8da953b0ca44fad77060c261982bf7678'
        },
        claims: {name: 'John Doe', birthday: '1989/04/01'},
        proof: 'eyJzaWduYXR1cmUiOnsiMCI6MjQsIjEiOjU2LCIyIjoyMDQsIjMiOjYyLCI0Ijo3OCwiNSI6MTg4LCI2IjoxMjEsIjciOjE3OSwiOCI6MzYsIjkiOjE0MiwiMTAiOjI0MywiMTEiOjEyMiwiMTIiOjE1MSwiMTMiOjIxMiwiMTQiOjIzNiwiMTUiOjcxLCIxNiI6MjIzLCIxNyI6MTQ1LCIxOCI6MjQsIjE5IjoxNDIsIjIwIjo5MywiMjEiOjI0OCwiMjIiOjMzLCIyMyI6MTk4LCIyNCI6MjU1LCIyNSI6MjAxLCIyNiI6MTc0LCIyNyI6MjA5LCIyOCI6OTIsIjI5Ijo3MywiMzAiOjI1MSwiMzEiOjEwOCwiMzIiOjUxLCIzMyI6MTYzLCIzNCI6MTAyLCIzNSI6MjIxLCIzNiI6MjI3LCIzNyI6MjAyLCIzOCI6MjM2LCIzOSI6MjEwLCI0MCI6MTE1LCI0MSI6MjIyLCI0MiI6NzgsIjQzIjo2MCwiNDQiOjE4NSwiNDUiOjEyMywiNDYiOjIzMSwiNDciOjEwLCI0OCI6MTA0LCI0OSI6MTA3LCI1MCI6MjQxLCI1MSI6MzEsIjUyIjoyNDgsIjUzIjoyMjksIjU0IjoxMDIsIjU1IjoyOCwiNTYiOjcyLCI1NyI6MzcsIjU4IjoyNDQsIjU5IjoyMzgsIjYwIjoxOTgsIjYxIjoxMDgsIjYyIjoxMDEsIjYzIjoxMzZ9LCJyZWNpZCI6MH0',
        mask: {}
    };

    let result;
    result = await verifyVC(vc, signerPublicKey, holderPublicKey);
    console.log('verifyVC', result);
}

async function presentVCs(){
    const credentials = [
        {
            type: 'VerifiableCredential',
            issuer: {
                did: 'did:ethr:0x6Ed63aaec40A124169C8E95d95dF0aBA512231d4',
                publicKey: '031cc244b67b82fd1be2ff51528f56a5cb5957fb8daabc58e910c99808e001a14f'
            },
            subject: {
                did: 'did:ethr:0xF3c3D51455Dc0b0b050fc4082a92cf5462e79776',
                publicKey: '0370546a93353bf27e30e97b043f1ffea8da953b0ca44fad77060c261982bf7678'
            },
            claims: {name: 'John Doe', birthday: '1989/04/01'},
            proof: 'eyJzaWduYXR1cmUiOnsiMCI6MjQsIjEiOjU2LCIyIjoyMDQsIjMiOjYyLCI0Ijo3OCwiNSI6MTg4LCI2IjoxMjEsIjciOjE3OSwiOCI6MzYsIjkiOjE0MiwiMTAiOjI0MywiMTEiOjEyMiwiMTIiOjE1MSwiMTMiOjIxMiwiMTQiOjIzNiwiMTUiOjcxLCIxNiI6MjIzLCIxNyI6MTQ1LCIxOCI6MjQsIjE5IjoxNDIsIjIwIjo5MywiMjEiOjI0OCwiMjIiOjMzLCIyMyI6MTk4LCIyNCI6MjU1LCIyNSI6MjAxLCIyNiI6MTc0LCIyNyI6MjA5LCIyOCI6OTIsIjI5Ijo3MywiMzAiOjI1MSwiMzEiOjEwOCwiMzIiOjUxLCIzMyI6MTYzLCIzNCI6MTAyLCIzNSI6MjIxLCIzNiI6MjI3LCIzNyI6MjAyLCIzOCI6MjM2LCIzOSI6MjEwLCI0MCI6MTE1LCI0MSI6MjIyLCI0MiI6NzgsIjQzIjo2MCwiNDQiOjE4NSwiNDUiOjEyMywiNDYiOjIzMSwiNDciOjEwLCI0OCI6MTA0LCI0OSI6MTA3LCI1MCI6MjQxLCI1MSI6MzEsIjUyIjoyNDgsIjUzIjoyMjksIjU0IjoxMDIsIjU1IjoyOCwiNTYiOjcyLCI1NyI6MzcsIjU4IjoyNDQsIjU5IjoyMzgsIjYwIjoxOTgsIjYxIjoxMDgsIjYyIjoxMDEsIjYzIjoxMzZ9LCJyZWNpZCI6MH0',
            mask: {}
        },
        {
            type: 'VerifiableCredential',
            issuer: {
                did: 'did:ethr:0x6Ed63aaec40A124169C8E95d95dF0aBA512231d4',
                publicKey: '031cc244b67b82fd1be2ff51528f56a5cb5957fb8daabc58e910c99808e001a14f'
            },
            subject: {
                did: 'did:ethr:0xF3c3D51455Dc0b0b050fc4082a92cf5462e79776',
                publicKey: '0370546a93353bf27e30e97b043f1ffea8da953b0ca44fad77060c261982bf7678'
            },
            claims: {state: 'Texas', age: '24'},
            proof: 'eyJzaWduYXR1cmUiOnsiMCI6NiwiMSI6MTAsIjIiOjEyMiwiMyI6MTEzLCI0Ijo4OCwiNSI6OTMsIjYiOjM3LCI3IjoyNDMsIjgiOjI0MSwiOSI6MjMyLCIxMCI6MTQ1LCIxMSI6MTc2LCIxMiI6MTU3LCIxMyI6MTY2LCIxNCI6MTMyLCIxNSI6NTgsIjE2IjozNywiMTciOjI0MiwiMTgiOjIyMSwiMTkiOjk0LCIyMCI6MzAsIjIxIjoxNiwiMjIiOjc1LCIyMyI6MjAsIjI0IjoxODksIjI1IjoxMTIsIjI2IjozMSwiMjciOjIwOCwiMjgiOjE1MSwiMjkiOjE2NiwiMzAiOjEzNywiMzEiOjk5LCIzMiI6ODcsIjMzIjoxNjIsIjM0IjoyMzYsIjM1IjoxMDgsIjM2Ijo0OCwiMzciOjI1MywiMzgiOjE4NCwiMzkiOjIzMSwiNDAiOjQ2LCI0MSI6MTkzLCI0MiI6NTgsIjQzIjoxMzMsIjQ0IjoyNywiNDUiOjgyLCI0NiI6OSwiNDciOjExOCwiNDgiOjE3NCwiNDkiOjE2OCwiNTAiOjE3OSwiNTEiOjE2MywiNTIiOjIyOCwiNTMiOjExMSwiNTQiOjIyMywiNTUiOjE4MCwiNTYiOjIsIjU3Ijo2MiwiNTgiOjIxMiwiNTkiOjI0MCwiNjAiOjQ5LCI2MSI6MTI0LCI2MiI6MTAzLCI2MyI6MjQ3fSwicmVjaWQiOjB9',
            mask: {}
        }
    ];
    //masking will hide that attribute in the presentations
    const masks = [{name: true, birthday: false}, {state: true, age: false}];
    const presentation = await present(credentials, masks, holderPrivateKey);
    console.log(presentation)
}

async function verifyPresentation(){
    const presentation = {
        subject: {
            did: 'did:ethr:0xF3c3D51455Dc0b0b050fc4082a92cf5462e79776',
            publicKey: '0370546a93353bf27e30e97b043f1ffea8da953b0ca44fad77060c261982bf7678'
        },
        type: 'VerifiablePresentation',
        credentials: [
            {
                type: 'VerifiableCredential',
                issuer: {
                    did: 'did:ethr:0x6Ed63aaec40A124169C8E95d95dF0aBA512231d4',
                    publicKey: '031cc244b67b82fd1be2ff51528f56a5cb5957fb8daabc58e910c99808e001a14f'
                },
                subject: {
                    did: 'did:ethr:0xF3c3D51455Dc0b0b050fc4082a92cf5462e79776',
                    publicKey: '0370546a93353bf27e30e97b043f1ffea8da953b0ca44fad77060c261982bf7678'
                },
                claims: {
                    birthday: '1989/04/01',
                    '48b9505fcaf618c0d5992af0057d0328d9ebd95133814293bac19c8f9c2bd409': '02e70d53a6e800b0f0e4123d2c28c696577bc9e9d3960915891232d7fe3cdfab'
                },
                proof: 'eyJzaWduYXR1cmUiOnsiMCI6MjQsIjEiOjU2LCIyIjoyMDQsIjMiOjYyLCI0Ijo3OCwiNSI6MTg4LCI2IjoxMjEsIjciOjE3OSwiOCI6MzYsIjkiOjE0MiwiMTAiOjI0MywiMTEiOjEyMiwiMTIiOjE1MSwiMTMiOjIxMiwiMTQiOjIzNiwiMTUiOjcxLCIxNiI6MjIzLCIxNyI6MTQ1LCIxOCI6MjQsIjE5IjoxNDIsIjIwIjo5MywiMjEiOjI0OCwiMjIiOjMzLCIyMyI6MTk4LCIyNCI6MjU1LCIyNSI6MjAxLCIyNiI6MTc0LCIyNyI6MjA5LCIyOCI6OTIsIjI5Ijo3MywiMzAiOjI1MSwiMzEiOjEwOCwiMzIiOjUxLCIzMyI6MTYzLCIzNCI6MTAyLCIzNSI6MjIxLCIzNiI6MjI3LCIzNyI6MjAyLCIzOCI6MjM2LCIzOSI6MjEwLCI0MCI6MTE1LCI0MSI6MjIyLCI0MiI6NzgsIjQzIjo2MCwiNDQiOjE4NSwiNDUiOjEyMywiNDYiOjIzMSwiNDciOjEwLCI0OCI6MTA0LCI0OSI6MTA3LCI1MCI6MjQxLCI1MSI6MzEsIjUyIjoyNDgsIjUzIjoyMjksIjU0IjoxMDIsIjU1IjoyOCwiNTYiOjcyLCI1NyI6MzcsIjU4IjoyNDQsIjU5IjoyMzgsIjYwIjoxOTgsIjYxIjoxMDgsIjYyIjoxMDEsIjYzIjoxMzZ9LCJyZWNpZCI6MH0',
                mask: {
                    '48b9505fcaf618c0d5992af0057d0328d9ebd95133814293bac19c8f9c2bd409': true
                }
            },
            {
                type: 'VerifiableCredential',
                issuer: {
                    did: 'did:ethr:0x6Ed63aaec40A124169C8E95d95dF0aBA512231d4',
                    publicKey: '031cc244b67b82fd1be2ff51528f56a5cb5957fb8daabc58e910c99808e001a14f'
                },
                subject: {
                    did: 'did:ethr:0xF3c3D51455Dc0b0b050fc4082a92cf5462e79776',
                    publicKey: '0370546a93353bf27e30e97b043f1ffea8da953b0ca44fad77060c261982bf7678'
                },
                claims: {
                    age: '24',
                    '382c91f29a68f1f29e9e0c1532954f833d5b5ddd01d54761eb92f823ea6802e9': 'b6c8b2bea395d41e9d05d4b4ba5629974c8fcd26b7d07edcb762741478157e7b'
                },
                proof: 'eyJzaWduYXR1cmUiOnsiMCI6NiwiMSI6MTAsIjIiOjEyMiwiMyI6MTEzLCI0Ijo4OCwiNSI6OTMsIjYiOjM3LCI3IjoyNDMsIjgiOjI0MSwiOSI6MjMyLCIxMCI6MTQ1LCIxMSI6MTc2LCIxMiI6MTU3LCIxMyI6MTY2LCIxNCI6MTMyLCIxNSI6NTgsIjE2IjozNywiMTciOjI0MiwiMTgiOjIyMSwiMTkiOjk0LCIyMCI6MzAsIjIxIjoxNiwiMjIiOjc1LCIyMyI6MjAsIjI0IjoxODksIjI1IjoxMTIsIjI2IjozMSwiMjciOjIwOCwiMjgiOjE1MSwiMjkiOjE2NiwiMzAiOjEzNywiMzEiOjk5LCIzMiI6ODcsIjMzIjoxNjIsIjM0IjoyMzYsIjM1IjoxMDgsIjM2Ijo0OCwiMzciOjI1MywiMzgiOjE4NCwiMzkiOjIzMSwiNDAiOjQ2LCI0MSI6MTkzLCI0MiI6NTgsIjQzIjoxMzMsIjQ0IjoyNywiNDUiOjgyLCI0NiI6OSwiNDciOjExOCwiNDgiOjE3NCwiNDkiOjE2OCwiNTAiOjE3OSwiNTEiOjE2MywiNTIiOjIyOCwiNTMiOjExMSwiNTQiOjIyMywiNTUiOjE4MCwiNTYiOjIsIjU3Ijo2MiwiNTgiOjIxMiwiNTkiOjI0MCwiNjAiOjQ5LCI2MSI6MTI0LCI2MiI6MTAzLCI2MyI6MjQ3fSwicmVjaWQiOjB9',
                mask: {
                    '382c91f29a68f1f29e9e0c1532954f833d5b5ddd01d54761eb92f823ea6802e9': true
                }
            }
        ],
        proof: 'eyJzaWduYXR1cmUiOnsiMCI6MjA3LCIxIjoxMTMsIjIiOjkwLCIzIjo5MCwiNCI6MTU5LCI1IjoyMTYsIjYiOjgzLCI3IjoxMzAsIjgiOjIyMywiOSI6MzksIjEwIjoyNDcsIjExIjoxMDgsIjEyIjoyOSwiMTMiOjE0NywiMTQiOjI0NSwiMTUiOjIxMiwiMTYiOjE2MCwiMTciOjE1MCwiMTgiOjE5NiwiMTkiOjM5LCIyMCI6NzQsIjIxIjozLCIyMiI6OTMsIjIzIjoxODYsIjI0IjoxNzQsIjI1IjoxNDAsIjI2IjoyMDYsIjI3IjoyNDAsIjI4Ijo2NSwiMjkiOjE2NCwiMzAiOjI0MiwiMzEiOjgsIjMyIjoxMSwiMzMiOjEzMCwiMzQiOjU1LCIzNSI6MTksIjM2IjoxMzMsIjM3IjoxNTYsIjM4IjoxNTYsIjM5Ijo0LCI0MCI6MjM0LCI0MSI6MTExLCI0MiI6OSwiNDMiOjY1LCI0NCI6NjYsIjQ1IjoyMDMsIjQ2IjoxMjIsIjQ3IjoxNzUsIjQ4Ijo1MSwiNDkiOjg3LCI1MCI6OTUsIjUxIjo3MCwiNTIiOjIwNCwiNTMiOjEyOSwiNTQiOjIxLCI1NSI6MTEzLCI1NiI6MTI4LCI1NyI6MzcsIjU4IjoyMDksIjU5IjoyNTQsIjYwIjoyMjYsIjYxIjoxNjcsIjYyIjoyMDMsIjYzIjoyMzh9LCJyZWNpZCI6MH0'
    };
    const verified = await verify(presentation, [signerPublicKey], holderPublicKey);
    console.log('presentation verified', verified)
}

issueVC();
verifyVCs().then();
presentVCs().then();
verifyPresentation().then();
