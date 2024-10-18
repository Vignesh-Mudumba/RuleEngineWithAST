db.rules.insertMany([
    {
      ast: {
        type: 'AND',
        left: { type: 'condition', value: { attribute: 'age', operator: '>', number: 30 } },
        right: { type: 'condition', value: { attribute: 'salary', operator: '>', number: 50000 } }
      }
    },
    {
      ast: {
        type: 'AND',
        left: { type: 'condition', value: { attribute: 'age', operator: '>', number: 25 } },
        right: { type: 'condition', value: { attribute: 'experience', operator: '>', number: 5 } }
      }
    }
  ]);
  