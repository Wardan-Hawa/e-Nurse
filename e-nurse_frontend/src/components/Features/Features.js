const features = [
    {
        icon: 'icon-medical-i-cardiology',
        title: 'Ask your e-Nurse',
        content: 'a Tool that allows you to havev more information about a drug you are taking.'
    },
    {
        icon: 'icon-medical-i-cardiology',
        title: 'drug interactions checker',
        content: 'Powerful tool to check if the drugs you are taking interact with each other.'
    },
    {
        icon: 'icon-medical-i-cardiology',
        title: 'create a drug report',
        content: 'create a detailed report to present it to one of our doctors for a consultation'
    },
    {
        icon: 'icon-medical-i-cardiology',
        title: 'consult a doctor',
        content: 'our medical team of different speacialities are here to offere you consultations about the drugs you are taking.'
    },
    {
        icon: 'icon-medical-i-cardiology',
        title: 'contact our doctors',
        content: 'the doctors that are working with us are also available for in-person check ups if necessary.'
    },
    {
        icon: 'icon-medical-i-cardiology',
        title: 'be responsible',
        content: 'be in charge of what drugs you are taking with the help of our tools and medical team.'
    },
]
const Features = () => {
    return (
        <section id="content">
                <div class="content-wrap">
                    <div class="container clearfix">
                        <div class="row col-mb-50 mb-0">
                            {
                                features.map((feature, i) => {
                                    return (
                                        <div class="col-sm-6 col-md-4" key={i}>
                                            <div class="feature-box fbox-plain">
                                                <div class="fbox-icon" data-animate="bounceIn">
                                                    <a href="#"><i class={feature.icon}></i></a>
                                                </div>
                                                <div class="fbox-content">
                                                    <h3>{feature.title}</h3>
                                                    <p>{feature.content}</p>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                </div>
            </section>
    )
}

export default Features