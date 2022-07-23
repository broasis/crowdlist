# Crowdlist

Crowdlist is a tool for collaborative list creation. This repo holds the frontend
part of the tool. It builds upon a single page of which the main view presents a list
of multiple grocery lists:
- Frühstück (breakfast)
- Mittag (lunch)
- Abendessen (dinner)

Each grocery list is viewable by clicking on it, which then represents itself as a
list of grocery items. The list of items can be extended by users using the textfield 
on top and already added items can be upvoted by other users. A user is identified by
an id and each grocery item holds an array of votes of all different users so that
it remains even if the original creator of the item decides to downvote/remove the item
from its preferences. The live backend is realized by a mongo database and a graphql server that provides the 
tool with data from the database. 

## TODOs

Development goals are managed with a [jira board](https://crowdlist.atlassian.net/jira/software/projects/CROW/boards/1
). 

## Changelog

### 2022-07-23
- Align all back buttons to use useNavigate instead of a simple link and appear in the same place
- Adjust impressum to always appear at the bottom of the page

### 2022-07-22
- Add impressum
- Add option to sort grocery list items by name

### 2022-07-15
- Manage authentication with a state that can changed at another subpage */login*

### 2022-07-13
- Use Apollo client to fetch live data from mongodb and push changes to it

### 2022-07-11
- Implement lists view so that multiple lists of groceries can be stored
- Current set of lists includes Frühstück (breakfast), Mittag (lunch) and Abendessen (dinner)

### 2022-06-30
- Initial commit