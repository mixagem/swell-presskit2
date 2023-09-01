
const mixStartFinishConfig = {
    start: ['section-content animate__animated hidden'],
    finish: ['section-content animate__animated zoomed-out']
}

const mixStlyesConfig = [{
    // .5 até .8
    offset: .8,
    matchType: '<=',
    classesToAdd: ['animate__fadeIn'],
    classesToRemove: ['hidden', 'zoomed-out']
}, {
    // 0 até .5
    offset: .5,
    matchType: '<=',
    classesToAdd: ['zoomed-out'],
    classesToRemove: []
}, {
    // .8 até 1 
    offset: .8,
    matchType: '>',
    classesToAdd: ['hidden'],
    classesToRemove: ['animate__fadeIn', 'zoomed-out']
},]

const mixStlyesConfig2 = [{
    // .5 até .85
    offset: .85,
    matchType: '<=',
    classesToAdd: ['animate__fadeIn'],
    classesToRemove: ['hidden', 'zoomed-out']
}, {
    // 0 até .65
    offset: .65,
    matchType: '<=',
    classesToAdd: ['zoomed-out'],
    classesToRemove: []
}, {
    // .8 até 1 
    offset: .85,
    matchType: '>',
    classesToAdd: ['hidden'],
    classesToRemove: ['animate__fadeIn', 'zoomed-out']
},]

onscroll = (event) => {
    magicElement(document.querySelector('section#first .section-content'), mixStartFinishConfig, mixStlyesConfig);
    magicElement(document.querySelector('section#second .section-content'), mixStartFinishConfig, mixStlyesConfig);
    magicElement(document.querySelector('section#third .section-content'), mixStartFinishConfig, mixStlyesConfig2)
    // const vid = document.querySelector('#waves');
    // vid.currentTime = (1 - percentFromTop) * vid.duration
    // vid.currentTime = 0;
};

function magicElement(element, startFinishConfig, stlyesConfig) {
    const viewportHeight = window.innerHeight;

    // above 1 is yet to be shown, below 0 means scrolled by already
    const percentFromTop = (element.getBoundingClientRect().top + element.getBoundingClientRect().height) / viewportHeight

    // ignoring elements aready shown / yet to be shown
    if (percentFromTop > 1) { element.classList = startFinishConfig.start}
    if (percentFromTop < 0) { element.classList = startFinishConfig.finish}

    stlyesConfig.forEach(config => {
        switch (config.matchType) {
            case '<=':
                if (percentFromTop <= config.offset) {
                    config.classesToAdd.forEach(className => {
                        if (!element.classList.contains(className)) {
                            element.classList.add(className)
                        }
                    });

                    config.classesToRemove.forEach(className => {
                        if (element.classList.contains(className)) {
                            element.classList.remove(className)
                        }
                    });
                }

                break;

            case '>':
                if (percentFromTop > config.offset) {
                    config.classesToAdd.forEach(className => {
                        if (!element.classList.contains(className)) {
                            element.classList.add(className)
                        }
                    });

                    config.classesToRemove.forEach(className => {
                        if (element.classList.contains(className)) {
                            element.classList.remove(className)
                        }
                    });
                }

                break;

        }
    })
}