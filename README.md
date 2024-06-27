# App

GymPass style app.

## FRs (Functional requirements)

- [x] Should be able to register
- [x] Should be able to authenticate
- [x] Should be able get the profile of a logged user
- [x] Should be able to get the number of check-ins realized by the logged user (like a daystreak)
- [x] The user should be able to get his own history of check-ins
- [x] The user should be able to search near gym's (up to 10km)
- [x] The user should be able to search gym's by the name
- [x] The user should be able to realize a check-in in a gym
- [x] Should be able to validate the check-in of a user
- [x] Should be able to register a gym

## BRs (Business Rules)

- [x] The user cant be able to register with a email already used.
- [x] The user cant do 2 check-ins in the same day
- [x] The user cant do check-in if he isnt near of the gym (100m)
- [x] The check-in only can be validated until 20 minutes after created
- [ ] The check-in only can be validated by administrators.
- [ ] The gym only can be register by administrators.

## NFRs (Non-Functional requirements)

- [x] The password of user must be encrypted
- [x] The application data must be persisted in a database PostgreSQL
- [x] All lists of data must be paginated with 20 items per page
- [ ] The user must be identified by a JWT (JSON Web Token)
