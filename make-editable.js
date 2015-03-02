"use strict";

/**
 * Makes the specified object editable by adding the 
 * following:
 * -An "Ed" object
 * -A StartEdit method, which prepares the Ed
 * -A RollBack method, which resets the Ed
 * -A Commit method, which copies the Ed's properties
 * to the object itself
 * -A HasChanges method, which compares the Ed to the
 * object itself
 * -A ResetEd method, which nulls the specified Ed
 * property (this is useful for dependent properties)
 *          
 * It requires the following arguments:
 * -model: A model object
 * -editableFields: An array of the names of the fields which are editable
 */
function MakeEditable(model, editableFields) {
    // Add the edit object.
    model.Ed = {};

    // Sets the editor member.
    model.StartEdit = function () {
        // Group the members by whether they are an array.
        var grps =
            _.chain(model)
                .pairs() // We want them as pairs so we keep the keys.
                .groupBy(function (it) { return _.isArray(it[1]); })
                .value();

        // Extract the specified keys.
        var arKeys =
            _.intersection(
                _.map(grps[true], function (it) { return it[0] }),
                editableFields);

        var nonArKeys =
            _.intersection(
                _.map(grps[false], function (it) { return it[0] }),
                editableFields);

        // Copy the non-array members that are on our list.
        model.Ed = _.extend(model.Ed, _.pick(model, nonArKeys));

        // We handle array members differently,
        // creating a deep copy of each one via JSON methods().
        for (var p in _.pick(model, arKeys)) {
            model.Ed[p] = JSON.parse(JSON.stringify(model[p]));
        }
    };

    // Sets all members on the instance to values 
    // on the edit.
    model.RollBack = function () {
        // The start edit method does just what we need.
        model.StartEdit();
    };

    // Sets selected instance properties to its
    // edit member's properties.
    model.Commit = function () {
        _.each(model.Ed, function (v, k) {
            model[k] = // Be sure to deep copy.                    
                _.isArray(v)
                ? JSON.parse(JSON.stringify(v))
                : _.extend(v);
        });
    };

    // Gets whether the model and edit member differ.
    model.HasChanges = function () {
        return !_.isEqual(
            _.pick(model, editableFields),
            model.Ed);
    };

    // Gets which fields changed.
    model.WhichChanges = function () {
        var r = [];

        for (var p in _.pick(model, editableFields)) {
            if (!_.isEqual(model[p], model.Ed[p])) r.push(p);
        }

        return r;
    };

    // Sets the specified edit field to null.
    model.ResetEd = function (f) {
        model.Ed[f] = null;
    };

    return model;
}