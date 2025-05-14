# Bioplatform: a multiple sequence alignment and phylogenetic tree full-stack application
## Description
This code repository implements the bioplatform, a full-stack application that executes multiple sequence alignments on user-submitted data and generates associated phylogenetic trees for those alignments. Users register accounts that have associated multiple sequence alignment jobs; these accounts are capable of executing new jobs and deleting old ones.
## Installation
Please clone the repository and execute ```npm install``` in the frontend directory and ```python -m pip install -r requirements.txt``` in the backend directory to install all required packages. Notable inclusions are:
- Frontend
    - React.js
    - React Router
    - Vite
    - TailwindCSS
    - Axios
- Backend
    - Django
    - Djangorestframework
    - Djangorestframework-simplejtw
    - Biopy
    - ETE3

Additionally, the application is currently reliant on the existence of command line executables corresponding to implemented MSA methods. At the moment, this is only ClustalW2. Please ensure that you have installed [ClustalW2](http://www.clustal.org/clustal2/) and added the executable to your device's path to ensure no issues with the Django back-end application.


<img width="1879" alt="Image" src="https://github.com/user-attachments/assets/7a6b4971-a090-4049-93c3-bd7ee12b5a1d" />
An example of a resulting sequence alignment from a multiple sequence alignment job run on the bioplatform.




<img width="1879" alt="Image" src="https://github.com/user-attachments/assets/a8c6aad8-2713-43aa-8491-a70e3e1e309e" />
An example of a phylogenetic tree from the same MSA job, generated from the resulting Newick tree file using ETE3's tree object and render function.

## Future considerations
- For the back-end environment, the development and addition of a specialized deep learning MSA approach would be ideal, though it ultimately was beyond the capabilities and scope of this application. To accomplish this, additional research into the deep learning MSA space should be conducted to potentially select and incorporate a proper existing solution that avoids the limitations of existing deep learning MSA approaches. If that fails, research into the correct deep learning neural network architecture should be conducted. Once chosen, that architecture should be extensively tested and trained on real world biological data cultivated by domain experts to ensure applicability to real life worldsets.
- Similarly, the application can still incorporate the DPAMSA and BetaAlign algorithms as possible options for a multiple sequence alignment. Their inclusion, however, necessitates the informing of the end user of the limitations of each MSA technique to ensure that correct datasets are submitted for these algorithms. Additionally, these deep learning technologies require additional investigation as to the application of phylogenetic tree generation and other analytical techniques to maintain the robustness of the application’s results.
- A recent preprint paper by Arsic and Mayer proposes a convolutional transformer neural network for sequence alignments (2025). Though the paper has yet to be peer reviewed or published, the proposal seems promising for the deep learning MSA subspace. With some investigation and testing of the proposed model, the application could potentially include it as a viable MSA option for users.  
- improvements to the result visualization are still an important target. The creation of a dedicated job view page is an important step to ensure end users can properly view the information they possess in the database. Currently, the job view page exists within the code, but the method for passing the information from the account page to the job view is incomplete. Additional investigations into the React.js framework and how the webhooks interact with HTML DOM elements are required to debug this issues and improve the user data view experience.
- The user interface also requires the incorporation of a feedback page to allow for user submissions and future improvement suggestions. This addition is not as high a priority, though it is a simple task of exposing form elements to the end user on a dedicated feedback page. Additionally, this will require the construction of a back-end Review model that contains the data submitted by end users; this data would be easily viewable by administrators through back-end tools like the PostgreSQL shell and the creation of Django endpoints to query the new model.
- Currently, the back-end API runs ClustalW through a subprocesses creation with Python per the instructions of the Biopy module and common coding practices of bioinformatics professionals. However, the Biopy module includes some MSA techniques within its runtime that have been deprecated. The application should probably be reconfigured to execute all of the included MSA methods within the Python code to avoid the existing reliance on the installation of additional executables. This will require investigation into the existence of Python implementations of the target MSA algorithms outside of the Biopy module. Accomplishing this improvement would allow the application to be easily hosted on cloud or containerized solutions without additional environment configurations, as well as more thoroughly future proof the application through less reliance on exterior executable. 
- Additionally, the front-end stylization requires more adjustment to be easily readable and aesthetically pleasing. The application should incorporate both a light theme and dark theme configuration for accessibility purposes. Additionally, refactoring the code to be mobile compatible is a strong desire to expand the potential userbase of the application, as the full-stack design was proposed to accommodate those bioinformatics analysts who lack the necessary hardware to execute their tasks.
- The application full-stack should potentially implement and incorporate in-application administrative functions. Rather than rely on the Djangorestframework’s exposed administration API endpoint and PostgreSQL’s shell interface, the application should be reconfigured to provide administrative users with an easy interface to handle full-stack data manipulation and management. This ensures that administrators need not be familiar with specific tools to access database data or other domain elements. It also ensures that the only data exposure that occurs to administrative users of the platform is tightly controlled.
- Finally, the application must be deployed to a proper cloud environment. This is to ensure that the application is suitable for general user access and utilization, as well as to demonstrate the viability of the application in a production space. Some additional modifications to included environment files and database connection configurations are necessary to accomplish this, but the skeleton of the production implementation exists in the form of the Django back-end’s “setting.py” file database configuration, and the “Dockerfile” on the front-end possessing the methods for containerization. Exploration of existing cloud solutions should be conducted to determine the most suitable locations for both the front-end container and the back-end storage solution.
