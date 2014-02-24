define( ['jquery', 'app/example-view'], function ( $, view ) {

  it( 'the body has no "name" div', function() {
    var nameDivs = $('div.name');
    expect(nameDivs.length).to.equal(0);
  });

  describe( 'when view is called with "body" element', function() {

    before( function() {
      view('body');
    });

    after( function() {
      $('body').empty();
    });

    it( 'the body element gets a "name" div', function() {
      var nameDivs = $('div.name');
      expect(nameDivs.length).to.equal(1);
    });
  });
});