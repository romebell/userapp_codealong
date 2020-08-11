const db = require('./models');

db.user.create({
    firstName: 'Rome',
    lastName: 'Bell',
    email: 'email@email.com',
    age: 32
})
.then(response => {
    console.log(response.get());
})
.catch(error => {
    console.log(error);
});

const rome = {
    where: { id: 2 }
};

db.user.findOne(rome)
.then(oneUser => {
    oneUser.createPet({
        name: 'Ramseys',
        description: 'This is the 2nd best pet in the world.',
        species: 'cat'
    })
    .then(onePet => {
        console.log(onePet.get());
    })
    .catch(err => {
        console.log('Error', err);
    });
})
.catch(err => {
    console.log(err);
});

db.user.findOne(rome)
.then(oneUser => {
    oneUser.getPets()
    .then(response => {
        for (let i = 0; i < response.length; i++) {
            let eachPet = response[i].get();
            console.log(eachPet);
        }
    })
    .catch(err => {
        console.log('Error', err);
    });
})
.catch(err => {
    console.log(err);
});

db.pet.findOrCreate({
    where: { name: 'Tyson' },
    defaults: { species: 'boxer', description: 'Knock out king!' }
})
.then(([createdPet, created]) => {
    console.log(`This pet was created: ${created}`);
    console.log(createdPet.get());

    db.user.findOne(rome)
    .then(userFromDB => {
        userFromDB.addPet(createdPet);
    })
    .catch(err => {
        console.log('Errors', err);
    });
})
.catch(err => {
    console.log('Error', err);
});

db.pet.findOrCreate({
    where: { name: 'Tyson' },
    defaults: { 
        species: 'dog', 
        description: 'Kock out king'
    }
})
.then(([pet, created]) => {
    console.log(`This was created: ${created}`);
    db.toy.findOrCreate({
        where: { type: 'boxing mat', color: 'green'}
    })
    .then(([toy, created]) => {
        console.log(`This was created: ${created}`);
        pet.addToy(toy)
        .then(assoc => {
            console.log(assoc);
        })
        .catch(err => {
            console.log('Error', err);
        });
    })
    .catch(err => {
        console.log('Error', err);
    })
})
.catch(err => {
    console.log('Error', err);
});

// pet and toy that give you pets_toys


db.pets_toys.findAll()
.then(response => {
    console.log(response);
})
.catch(err => {
    console.log(err);
});

// artist and albums that give you playlists

db.artist.findOrCreate({
    where: { name: 'Drake'},
    defaults: { city: 'Toronto', description: 'Drake is a hip-hop artist'}
})
.then(([artist, created]) => {
    console.log(created);

    db.album.findOrCreate({
        where: { title: 'Dark Lane Demo Tapes'},
        defaults: { year: 2020, genre: 'hip-hop'}
    })
    .then(([album, created]) => {
        console.log(created);
        artist.addAlbum(album)
        .then(relationshipInfo => {
            console.log(relationshipInfo[0].get());
        })
        .catch(err => {
            console.log(err);
        });
    })
    .catch(err => {
        console.log(err);
    });
})
.catch(err => {
    console.log(err);
});