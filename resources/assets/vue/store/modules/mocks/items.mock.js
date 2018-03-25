export default (() => {
    let arr = [];
    const items = [
    {
        url: "",
        title: "VELVET PUMPS WITH BEJEWELED HEELS",
        image: "images/4.jpg",
        price: 520,
        url: "",
        like: 10,
        comment: 10,
        link: "dolcegabbana.com",
        by: "Modasti retail - Modasti"
    },
    {
        url: "",
        title: "VELVET PUMPS WITH BEJEWELED HEELS",
        image: "images/3.jpg",
        price: 320,
        url: "",
        like: 20,
        comment: 11,
        link: "dolcegabbana.com",
        by: "Modasti retail - Modasti"
    },
    {
        url: "",
        title: "VELVET PUMPS WITH BEJEWELED HEELS",
        image: "images/1.jpg",
        price: 120,
        url: "",
        like: 5,
        comment: 2,
        link: "dolcegabbana.com",
        by: "Modasti retail - Modasti"
    }
    ];
    return (num) =>{
        let arr = [];
        for (let i = 0; i < num; i++) {
            arr.push(items[Math.floor(Math.random() * 3)]);
        }
        return arr;
    };
})();
