export default function transformer(file, api) {
    const j = api.jscodeshift;
    const root = j(file.source);
    const objectExpressions = root.find(j.ObjectExpression);
    objectExpressions.forEach(path => {
    	return path.value.properties.forEach(keyPath => {  
          if(keyPath.value && keyPath.value.type === 'FunctionExpression' && keyPath.value.id){
            const identifier = j(keyPath.value).find(j.Identifier);
            identifier.filter(path => {
              return keyPath.key.name === path.value.name;
            })
            .remove();
          }
    	});
    
    });
    return root.toSource();
};