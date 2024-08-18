export const headerLinks = [
    {
        label: 'Home',
        route: '/',
    },
    {
        label: 'About Us',
        route: '/about',
    },
    {
        label: 'All Event',
        route: '/events/allEvents',
    },
    {
        label: 'My Profile',
        route: '/profile',
    },
]


export const eventDefaultValues = {
    title: '',
    description: '',
    location: '',
    imageUrl: '',
    startDateTime: new Date(),
    endDateTime: new Date(),
    categoryId: '',
    price: '',
    isFree: false,
    url: '',
}