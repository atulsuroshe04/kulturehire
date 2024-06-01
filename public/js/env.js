var env = {
    iconLoaderUrl: "/js/json/icons.json",
    googleMarkerUrl: "/img/markar-icon.png",
    editorIconUrl: "/img/ui/icons.svg",
    mapClockIcon: "/img/svg/clock-ticket1.svg"
}

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('searchForm');
    form.addEventListener('submit', async (event) => {
        event.preventDefault();

        // Create a FormData object from the form
        const formData = new FormData(form);

        // Convert FormData to a plain object
        const formDataObj = {};
        formData.forEach((value, key) => {
            if (formDataObj[key]) {
                if (!Array.isArray(formDataObj[key])) {
                    formDataObj[key] = [formDataObj[key]];
                }
                formDataObj[key].push(value);
            } else {
                formDataObj[key] = value;
            }
        });

        // Send the form data using fetch API
        try {
            const response = await
                fetch('/employer/filter-candidates', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(formDataObj)
                });

            if (response.ok) {
                const result = await response.json();
                var html = ''

                if (result.length > 0) {
                    result.map(sim => {
                        var mileston_value = (100 * sim.completed_milestones) / 15;
                        milestone_percent = Math.round(mileston_value);
                        html += `<div class="col-12 mb-25 px-10">
                    <div class="card job job--list">
                        <div class="h-100">
                            <div class="job-item px-25 py-30">
                                <div class="card-body p-0  d-flex align-items-sm-center align-items-start flex-wrap">
                                    <div class="job-item__body text-capitalize d-flex flex-wrap">
                                        <div class="job-item__image d-flex align-items-center">
                                            <a href="#">
                                                <div class="generateAvatar job-item__image-img img-fluid" src="/img/stats.png" alt="digital-chair">J</div>
                                                </a><div class="job-item__title"><a href="#">
                                                    </a><a href="jobDetails.html">
                                                        <h6 class="card-title">`+ sim.candidate_id.name + `
                                                        </h6>
                                                    </a>
                                                    <span>`+ sim.candidate_id.current_location + `</span>
                                                </div>
                                        </div>
                                        <div class="job-item__content d-flex">

                                            <div class="job-type">
                                                <span>Program</span>
                                                <h6>`+ sim.program_id.name + `</h6>
                                            </div>
                                            <div class="job-deadline">
                                                <span>Milestone Prgoress</span>
                                                <div class="progress-wrap d-flex align-items-center mb-15">
                                                    <div class="progress">
                                                        <div class="progress-bar bg-primary" role="progressbar" style="width: `+ milestone_percent + `%;" aria-valuenow="30" aria-valuemin="0" aria-valuemax="100"></div>
                                                    </div>
                                                    <span class="progress-percentage">`+ milestone_percent + `%</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="job-item__button d-flex flex-wrap my-sm-0 my-10">
                                        <a href="/employer/simulation/662cbbaeed550224ce194b8d/en"><button class="btn btn-default btn-squared color-none btn-outline-none px-20">View
                                                details
                                            </button></a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>`;
                    })
                } else {
                    html += `<div class="card-body">
                    <div class="dm-empty text-center">
                       <div class="dm-empty__image">
                          <img src="https://fe.kulturehire.com/img/svg/1.png" alt="Admin Empty">
                       </div>
                       <div class="dm-empty__text">
                          <p class="">No Data</p>
                       </div>
                    </div>
                 </div>`;
                }
                document.getElementById('searchResult').innerHTML = html;
            } else {
                console.error('Error:', response.statusText);
            }
        } catch (error) {
            console.error('Fetch Error:', error);
        }
    });

});

async function handleButtonClick(action) {
    try {
        const response = await
            fetch('/employer/view-action', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ candidate_id: document.getElementById('candidate_id').value, simulation_id: document.getElementById('simulation_id').value, action: action })
            });

        if (response.ok) {
            const result = await response.json();
            document.getElementById('maskNumber').innerHTML = document.getElementById('whole_number').value;
        } else {
            alert('Error:', response.statusText);
        }
    } catch (error) {
        console.log('Fetch Error:', error);
    }
}

