
const modal = document.getElementById("resumeModal") as HTMLDivElement;
const openModalButton = document.getElementById("openModal") as HTMLButtonElement;
const closeModalButton = document.getElementById("closeModal") as HTMLSpanElement;
const resumeForm = document.getElementById("resumeForm") as HTMLFormElement;
const resumeOutput = document.getElementById('resumeOutput') as HTMLDivElement;
const createShareableLink = document.getElementById('createShareableLink') as HTMLDivElement;
const shareableLinkElement = document.getElementById('shareableLink') as HTMLAnchorElement;
const downloadPDF = document.getElementById('downloadPDF') as HTMLButtonElement;

// Open modal when button is clicked
openModalButton.onclick = function () {
    modal.style.display = 'block';
};

// Close modal when close button is clicked
closeModalButton.onclick = function () {
    modal.style.display = 'none';
};

// Close modal when clicking outside of the modal content
window.onclick = function (event) {
    if (event.target === modal) {
        modal.style.display = 'none';
    }
};

// Form Submission
resumeForm.onsubmit = function (event) {
    event.preventDefault();



    // Get form values
    const username = (document.getElementById('username') as HTMLInputElement).value;
    const name = (document.getElementById('name') as HTMLInputElement).value;
    const email = (document.getElementById('email') as HTMLInputElement).value;
    const phone = (document.getElementById('phone') as HTMLInputElement).value;
    const cnic = (document.getElementById('cnic') as HTMLInputElement).value;
    const profilePictureInput = (document.getElementById('profilePhoto') as HTMLInputElement);
    const education = (document.getElementById('education') as HTMLTextAreaElement).value;
    const skills = (document.getElementById('skills') as HTMLTextAreaElement).value;
    const experience = (document.getElementById('experience') as HTMLTextAreaElement).value;

    // Save form data in localStorage with the username as the key
    const resumeData = {
        name,
        email,
        phone,
        cnic,
        education,
        skills,
        experience
    };
    localStorage.setItem(username, JSON.stringify(resumeData)); // Saving the data locally

    // profile picture
    const profilePictureFile = profilePictureInput.files?.[0]; // Get the first file if it exists
    const outputProfilePhoto = document.getElementById('outputProfilePhoto') as HTMLImageElement;

    if (profilePictureFile) {
        const reader = new FileReader();
        reader.onload = function (e) {
            outputProfilePhoto.src = e.target?.result as string;
            outputProfilePhoto.style.display = 'block';
        };
        reader.readAsDataURL(profilePictureFile);
    }

    // output
    document.getElementById('outputName')!.innerHTML = `<b>Name</b> : ${name}`;
    document.getElementById('outputEmail')!.innerHTML = `<b>Email</b> : ${email}`;
    document.getElementById('outputPhone')!.innerHTML = `<b>Phone</b> : ${phone}`;
    document.getElementById('outputCNIC')!.innerHTML = `<b>CNIC</b> : ${cnic}`;
    document.getElementById('outputEducation')!.innerHTML = `<b>Education</b> : ${education}`;
    document.getElementById('outputSkills')!.innerHTML = `<b>Skills</b> : ${skills}`;
    document.getElementById('outputExperience')!.innerHTML = `<b>Experience</b> : ${experience}`;

    // PDF download
    downloadPDF.addEventListener('click', () => {
        window.print();
    });

    // Show resume output and hide the modal
    resumeOutput.style.display = 'block';
    modal.style.display = 'none';

    document.getElementById('editResume')?.addEventListener('click', function () {
        document.getElementById('resumeModal')!.style.display = 'block';
    });

    function makeEditable() {
        const editableElements = document.querySelectorAll('.editResume');
        editableElements.forEach(element => {
            element.addEventListener('click', function () {
                const currentElement = element as HTMLElement;
                const currentValue = currentElement.textContent || "";

                // replace content
                if (currentElement.tagName === "P" || currentElement.tagName === "SPAN") {
                    const input = document.createElement('input')
                    input.type = 'text'
                    input.value = currentValue;
                    input.classList.add('editresume')

                    input.addEventListener('blur', function () {
                        currentElement.textContent = input.value;
                        currentElement.style.display = 'inline'
                        input.remove()
                    })

                    currentElement.style.display = 'none'
                    currentElement.parentNode?.insertBefore(input, currentElement);
                    input.focus()
                }
            })
        })
    }

    // Generate a shareable URL with username 
    const shareableURL =
        `${window.location.origin}?username=${encodeURIComponent(username)}`;
    // Display shareable link
    createShareableLink.style.display = 'block';
    shareableLinkElement.href = shareableURL;
    shareableLinkElement.textContent = shareableURL;
};

// Prefill the form based on the username in the URL
window.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const username = urlParams.get('username');
    if (username) {

        // Autofill form if data is found in localStorage
        const savedResumeData = localStorage.getItem(username);
        if (savedResumeData) {
            const resumeData = JSON.parse(savedResumeData);
            (document.getElementById('username') as HTMLInputElement).value =
                username;
            (document.getElementById('name') as HTMLInputElement).value =
                resumeData.name;
            (document.getElementById('cnic') as HTMLInputElement).value =
                resumeData.cnic
            (document.getElementById('email') as HTMLInputElement).value =
                resumeData.email;
            (document.getElementById('phone') as HTMLInputElement).value =
                resumeData.phone;
            (document.getElementById('profilePhoto') as HTMLInputElement).value =
                resumeData.profilePhoto;
            (document.getElementById('education') as HTMLTextAreaElement).value =
                resumeData.education;
            (document.getElementById('experience') as HTMLTextAreaElement).value
                = resumeData.experience;
            (document.getElementById('skills') as HTMLTextAreaElement).value =
                resumeData.skills;
        }
    }

});


