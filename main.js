const funkyElements = {
    'section#origins': {
        // (aka distance from bottom)
        viewports: [
            [0, 40],
            [40, 85],
            [85, 100]
        ],
        classes: [
            { classesToAdd: ['first-fx'], removeAll: true },
            { classesToAdd: ['second-fx'], removeAll: true },
            { classesToAdd: ['third-fx'], removeAll: true }
        ]
    },
    'section#debuts': {
        // (aka distance from bottom)
        viewports: [
            [0, 33],
            [33, 66],
            [66, 99],
            [99, 100]
        ],
        classes: [
            { classesToAdd: ['first-fx'], removeAll: true },
            { classesToAdd: ['second-fx'], removeAll: true },
            { classesToAdd: ['third-fx'], removeAll: true },
            { classesToAdd: ['forth-fx'], removeAll: true }
        ]
    },
    'section#history': {
        // (aka distance from bottom)
        viewports: [
            [0, 35],
            [35, 70],
            [70, 100]
        ],
        classes: [
            { classesToAdd: ['first-fx'], removeAll: true },
            { classesToAdd: ['second-fx'], removeAll: true },
            { classesToAdd: ['third-fx'], removeAll: true }
        ]
    },
    'section#embeds': {
        // (aka distance from bottom)
        viewports: [
            [0, 50],
            [50, 75],
            [75, 100]
        ],
        classes: [
            { classesToAdd: ['first-fx'], removeAll: true },
            { classesToAdd: ['second-fx'], removeAll: true },
            { classesToAdd: ['third-fx'], removeAll: true }
        ]
    }
}

onscroll = (event) => {
    funkMyElements()
}

document.querySelectorAll('section#embeds > div.content-wrapper > div#embed-controls > span').forEach(element => {
    element.addEventListener('click', event => {
        embedControlsClassSwap(Number(event.target.attributes.name.value))
    })
});

function embedControlsClassSwap(targetIndex) {
    document.querySelectorAll('section#embeds > div.content-wrapper > div#embed-controls > span').forEach(element => {
        element.classList = '';
    });

    document.querySelector(`section#embeds > div.content-wrapper > div#embed-controls > span:nth-of-type(${targetIndex})`).classList.add('selected-iframe')


    document.querySelectorAll('section#embeds > div.content-wrapper > iframe').forEach(element => {
        element.classList = '';
    });
    document.querySelector(`section#embeds > div.content-wrapper > iframe:nth-of-type(${targetIndex})`).classList.add('toggled-iframe')

}

function getElementVisibilityInfo(element) {

    const clientRect = document.querySelector(element).getBoundingClientRect()
    // altura elemento
    const viewPortSize = window.innerHeight
    // posição elemento na janela
    const positionOnWindow = clientRect.y
    // percentagem visivel
    const distanceFromBottom = positionOnWindow / viewPortSize


    if (positionOnWindow > viewPortSize || positionOnWindow < -viewPortSize) {
        visibilityInfo = { animationRange: false }
        return visibilityInfo
    }

    switch (true) {
        case positionOnWindow === 0:
            visibilityInfo = { animationRange: true, position: 'center', distanceFromBottom: 100 }
            break;
        case positionOnWindow > 0:
            visibilityInfo = { animationRange: true, position: 'top', distanceFromBottom: (1 - distanceFromBottom) * 100 }
            break;
        case positionOnWindow < 0:
            visibilityInfo = { animationRange: true, position: 'bottom', distanceFromBottom: (1 + distanceFromBottom) * 100 }
            break;
    }

    return visibilityInfo
}

function funkMyElements() {
    Object.keys(funkyElements).forEach(element => {
        const elementVisibilityInfo = getElementVisibilityInfo(element)

        // element not in need of funk
        if (!elementVisibilityInfo.animationRange) { return }

        const funkyStyles = funkyElements[element];
        const DOMElement = document.querySelector(element);

        for (i = 0; i < funkyStyles.viewports.length; i++) {
            if (elementVisibilityInfo.distanceFromBottom >= funkyStyles.viewports[i][0] && elementVisibilityInfo.distanceFromBottom < funkyStyles.viewports[i][1]) {

                if (funkyStyles.classes[i].removeAll) {
                    DOMElement.classList = '';
                } else {
                    funkyStyles.classes[i].classesToRemove.forEach(cssClass => {
                        DOMElement.classList.remove(cssClass)
                    });
                }

                funkyStyles.classes[i].classesToAdd.forEach(cssClass => {
                    DOMElement.classList.add(cssClass)

                });

                DOMElement.classList.toggle('reverse', elementVisibilityInfo.position === 'bottom')
            }
        }
    });
}

funkMyElements();