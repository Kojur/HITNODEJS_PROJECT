const mongoose = require('mongoose');

const userCollection = mongoose.connection.collection('users');


module.exports.categorizeCostItems = function categorizeCostItems(items,details) {
    const categories = ['food', 'education', 'health', 'housing' , 'sport'];
    const {id,year,month} = details;
    const result = {
        userid: id,
        year,
        month,
        costs: categories.map(category => ({ [category]: [] }))
    };

    items.forEach(categoryData => {
        const categoryName = categoryData._id;
        const matchingCategoryIndex = result.costs.findIndex(
            costItem => Object.keys(costItem)[0] === categoryName
        );
        if (matchingCategoryIndex !== -1) {
            const transformedRecords = categoryData.records.map(record => ({
                sum: record.sum,
                description: record.description,
                day: new Date(record.date).getDate()
            }));

            result.costs[matchingCategoryIndex][categoryName] = transformedRecords;
        }
    });
    return result;
}

module.exports.addFundsToUser = async function addFundsToUser(amount,userid) {
    const query = {id: userid};
    const update = {$inc: {total: amount}};
    const updatedDoc = await userCollection.findOneAndUpdate(
        query,
        update,
        {returnDocument: 'after',});

    if (!updatedDoc) {
        throw new Error('User not found');
    }
    return updatedDoc;
}