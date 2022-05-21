const tabGroupsList = document.getElementById('tabGroupsList')

// chrome.storage.local.get("bookmarkTree", ({ bookmarkTree }) => {
//     document.getElementById("bookmarkTreeDisplay").innerHTML = bookmarkTree
// })

chrome.tabGroups.query({}, (allGroups) => {
    for (i in allGroups) {
        const li = document.createElement('li')

        let button = document.createElement('button')
        button.id = i
        button.innerHTML = allGroups[i].title
        button['data-title'] = allGroups[i].title

        // loop through group
        button.addEventListener('click', () => {
            chrome.bookmarks.create({ parentId: chrome.bookmarks.getTree().id, title: button['data-title'] }, (dir) => {
                // get all tabs in given group
                chrome.tabs.query({ groupId: allGroups[button.id].id }, (group) => {
                    for (j in group) {
                        chrome.bookmarks.create({ parentId: dir.id, title: group[j].title, url: group[j].url })
                    }
                })
            })
        })

        li.appendChild(button)
        tabGroupsList.appendChild(li)
    }
})