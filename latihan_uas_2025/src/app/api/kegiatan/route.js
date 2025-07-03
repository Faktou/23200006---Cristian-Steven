import prisma from '@/lib/prisma';


export async function GET() {
    try {
        const data = await prisma.kegiatan.findMany({
            include: { organisasi: true },
            orderBy: { id: 'asc' },
        });
        return new Response(JSON.stringify(data), { status: 200 });
    } catch (error) {
        console.error("Error fetching kegiatan:", error);
        return new Response(JSON.stringify({ error: 'Failed to fetch activities' }), { status: 500 });
    }
}


export async function POST(request) {
    const {
        judul_kegiatan,
        id_organisasi,
        tanggal_kegiatan,
        lokasi,
        jenis_kegiatan,
        deskripsi_singkat
    } = await request.json();

    if (!judul_kegiatan || !id_organisasi || !tanggal_kegiatan || !lokasi || !jenis_kegiatan || !deskripsi_singkat) {
        return new Response(JSON.stringify({ error: 'All fields are required' }), {
            status: 400,
        });
    }

    try {
        const kegiatan = await prisma.kegiatan.create({
            data: {
                judul_kegiatan,
                id_organisasi: Number(id_organisasi),
                tanggal_kegiatan: new Date(tanggal_kegiatan),
                lokasi,
                jenis_kegiatan,
                deskripsi_singkat,
            },
        });
        return new Response(JSON.stringify(kegiatan), { status: 201 });
    } catch (error) {
        console.error("Error creating kegiatan:", error);
        return new Response(JSON.stringify({ error: 'Failed to create activity' }), { status: 500 });
    }
}


export async function PUT(request) {

    const {
        id,
        judul_kegiatan,
        id_organisasi,
        tanggal_kegiatan,
        lokasi,
        jenis_kegiatan,
        deskripsi_singkat
    } = await request.json();

    if (!id || !judul_kegiatan || !id_organisasi || !tanggal_kegiatan || !lokasi || !jenis_kegiatan || !deskripsi_singkat) {
        return new Response(JSON.stringify({ error: 'All fields (including ID) are required for update' }), {
            status: 400
        });
    }

    try {
        const kegiatan = await prisma.kegiatan.update({
            where: { id: Number(id) }, 
            data: {
                judul_kegiatan,
                id_organisasi: Number(id_organisasi),
                tanggal_kegiatan: new Date(tanggal_kegiatan),
                lokasi,
                jenis_kegiatan,
                deskripsi_singkat,
            },
        });
        return new Response(JSON.stringify(kegiatan), { status: 200 }); 
    } catch (error) {
        console.error("Error updating kegiatan:", error);
        return new Response(JSON.stringify({ error: 'Failed to update activity' }), { status: 500 });
    }
}

export async function DELETE(request) {
    const { id } = await request.json();

    if (!id) {
        return new Response(JSON.stringify({ error: 'ID is required to delete' }), { status: 400 });
    }

    try {
        await prisma.kegiatan.delete({ where: { id: Number(id) } }); 
        return new Response(JSON.stringify({ message: 'Deleted Successfully' }), { status: 200 });
    } catch (error) {
        console.error("Error deleting kegiatan:", error);
        return new Response(JSON.stringify({ error: 'Failed to delete activity' }), { status: 500 });
    }
}
