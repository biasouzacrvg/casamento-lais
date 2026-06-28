(function(angular, window) {
    'use strict';
    angular.module('tiffanyAndKelvin')
        .controller('LandingCtrl', LandingCtrl);

    function LandingCtrl($scope, GoogleMapInit, $timeout, $uibModal, $http) {
        var vm = this;
        vm.renGallery = [];

        $http.get('gallery-ren.json')
        .then(function(res) {
            vm.renGallery = res.data;
        })
        .catch(function(err){
            console.error("erro json", err);
        });
        function openRenGallery(idx) {
            var images = vm.renGallery.map(function(img, i) {
                return { id: i, image: 'images/fotos-pw/' + img };
            });
            openGalleryModal(idx, images);
        }

        var fixOurStory = function() {
            var listItems = $('.how-it-works-li');
            var maxHeight = undefined;
            listItems.each(function() {
                var currentItem = $(this);
                if(!maxHeight ||currentItem.outerHeight() > maxHeight) {
                    maxHeight = currentItem.outerHeight();
                }
            });

            listItems.each(function() {
                var currentItem = $(this);
                if(currentItem.outerHeight() !== maxHeight) {
                    currentItem.css('min-height', maxHeight + 'px');
                }
            });
        };

        vm.mapsApiFailed = false;

        vm.openEdytaGallery = openEdytaGallery;

        vm.openRenGallery = openRenGallery;

        vm.openRoomBlockModal = openRoomBlockModal;

        $scope.$on('$viewContentLoaded', function() {
            window.tak.runUripV2();
            GoogleMapInit.mapsInitialized.then(function() {
                var directionsDisplay = new google.maps.DirectionsRenderer;
                var directionsService = new google.maps.DirectionsService;

                // make the map after the digest cycle is complete
                $timeout(function() {
                    var mapDiv = document.getElementById('googleMap');
                    var map = new google.maps.Map(mapDiv, {
                        center: {lat: 36.115662, lng: -115.170364},
                        zoom: 12,
                        scrollwheel: false
                    });
                    directionsDisplay.setMap(map);
                    directionsDisplay.setPanel(document.getElementById('right-panel'));

                    directionsService.route({
                        origin: 'POSTO VALE DO POMBA - BR-116 - Fortaleza, Leopoldina - MG',
                        destination: 'Sítio Ebenézer - Leopoldina MG - Rua Manoel Honório da Cunha - Zona rural, Leopoldina - MG',
                        travelMode: 'DRIVING'
                    }, function(response, status) {
                        if (status === 'OK') {
                            directionsDisplay.setDirections(response);
                        } else {
                            // Show iframe instead
                            $scope.$apply(vm.mapsApiFailed = true);
                        }
                    });
                });
            });

            fixOurStory();
        });

        $(window).resize(fixOurStory);

        function openRoomBlockModal() {
            $uibModal.open({
                animation: true,
                templateUrl: 'app/landing/room-block-modal.html',
                controller: 'RoomBlockModalCtrl',
                controllerAs: 'vm',
                size: 'lg'
            });
        }

        function openEdytaGallery(idx) {
            var images =  [
                {id: 0, image: 'images/thumbnail-strip/girassol1.jpeg'},
                {id: 1, image: 'images/thumbnail-strip/girassol2.jpeg'},
                {id: 2, image: 'images/thumbnail-strip/girassol3.jpeg'},
                {id: 3, image: 'images/thumbnail-strip/girassol4.jpeg'},
                {id: 4, image: 'images/thumbnail-strip/girassol5.jpeg'},
                {id: 5, image: 'images/thumbnail-strip/girassol6.jpeg'}
            ];
            openGalleryModal(idx, images);
        }

        function openGalleryModal(idx, images) {
            $uibModal.open({
                animation: true,
                templateUrl: 'app/landing/gallery-modal.html',
                controller: 'GalleryModalCtrl',
                controllerAs: 'vm',
                size: 'lg',
                resolve: {
                    startIdx: function() {
                        return idx;
                    },
                    images: function () {
                        return images;
                    }
                }
            });
        }
    }
})(angular, window);