<script src="{{ asset('dropzone/js/dropzone.js') }}"></script>
<script>
    // DropzoneJS Demo Code Start
    Dropzone.autoDiscover = false

    // Get the template HTML and remove it from the doumenthe template HTML and remove it from the doument
    var previewNode = document.querySelector("#template")
    previewNode.id = ""
    var previewTemplate = previewNode.parentNode.innerHTML
    previewNode.parentNode.removeChild(previewNode)
    var myDropzone = new Dropzone(document.body, { // Make the whole body a dropzone
        url: uploadedImage, // Set the url
        thumbnailWidth: 80,
        thumbnailHeight: 80,
        acceptedFiles: ".jpg,.jpeg,.png,.gif",
        previewTemplate: previewTemplate,
        autoProcessQueue: false, // Make sure the files aren't queued until manually added
        previewsContainer: "#previews", // Define the container to display the previews
        clickable: ".fileinput-button",
    })

    myDropzone.on("addedfile", function(file) {
        const dropzoneContainer = document.getElementById("dropzone-container");
        // console.log(file.name)
        file.previewElement.querySelector("img").style.width = "80px";
        file.previewElement.querySelector("img").style.height = "80px";
        if (!file.id) {
            myDropzone.processFile(file);
        }

        file.previewElement.querySelector(".delete").onclick = function() {
            var that = $(this);
            swal({
                title: sure,
                text: confirm,
                icon: "info",
                buttons: [cancelText, ConfirmText],
                successMode: true,
            }).then((result) => {
                if (result) {
                    removeFileFromDB(file)

                }
            });

        };


        // Bind the click event to the delete button

    })
    myDropzone.on("error", function(file, response, xhr) {
        // parse the error response into a JSON object
        // check if the error response contains validation errors
        if (response.errors) {
            // loop through the validation errors
            for (let key in response.errors) {
                // show the validation error message
                swal({
                    title: errorMessage,
                    text: response.errors[key][0],
                    icon: "error"
                });
                myDropzone.removeFile(file)
            }
        }
    });
    myDropzone.on("success", function(file, response) {
        $.ajax({
            url: documentImage,
            type: "GET",
            success: function(data) {
                var images = data.images;
                $("#imageCount").html(data.image_count );
            }
        });
      });


    $("#deleteAll").click(function() {
        swal({
            title: sure,
            text: confirm,
            icon: "info",
            buttons: [cancelText, ConfirmText],
            successMode: true,
        }).then((result) => {
            if (result) {
                removeAllDocumenTFileFromDB(document_id)
            }
        });
    });
    // get uploaded images
    $.ajax({
        url: documentImage,
        type: "GET",
        success: function(data) {
            myDropzone.removeAllFiles();
            var images = data.images;

            for (var i = 0; i < images.length; i++) {
                var mockFile = {
                    name: images[i].name,
                    id: images[i].id,
                };
                // Call the default addedfile event handler
                myDropzone.emit("addedfile", mockFile);
                myDropzone.files.push(mockFile);
                // And optionally show the thumbnail of the file:
                myDropzone.emit("thumbnail", mockFile, images[i].image);
                // Make sure that there is no progress bar, etc...
                myDropzone.emit("complete", mockFile);
            }
            $("#imageCount").html(data.image_count );
        }
    });



    function removeFileFromDB(file) {
        if (!file.id) {
            file.id = file.name;
          }
        $.ajax({
            type: 'DELETE',
            url: deleteRoute + file.id,
            success: function(data) {
                $("#imageCount").html(data.imageCount );
                swal({
                    title: "{{ trans('general.delete') }}",
                    text: data.success,
                    icon: "success"
                });
                // Remove the file from the DropzoneJS instance
                myDropzone.removeFile(file);
                //location.reload();
            }
        });
    }

    function removeAllDocumenTFileFromDB(document_id) {
        // console.log(file)
        $.ajax({
            type: 'DELETE',
            url: deleteAllRoute + document_id,
            success: function(response) {
                if (response.success) {
                    // show the validation error message
                    $("#imageCount").html(response.imageCount );
                    myDropzone.removeAllFiles();
                    swal({
                        title: "{{ trans('document.deleteAll') }}",
                        text: response.success,
                        icon: "success"
                    });

                    // Remove the file from the DropzoneJS instance
                }else{
                    $("#imageCount").html(response.imageCount );
                    myDropzone.removeAllFiles();
                    swal({
                        title: "{{ trans('document.deleteAll') }}",
                        text: response.error,
                        icon: "error"
                    });

                }
            }
        });
    }

    // DropzoneJS Demo Code End
</script>
@include('includes.documents._image_full_screen_modal')
